import Comment from "../models/comment.model.js"
import Sentiment from "../models/sentiment.model.js"

export const createComment = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "Login required to comment" })
        }
        const { description } = req.body;
        const { coinId } = req.params;
        if (!description || description.trim().length == 0) {
            return res.status(400).json({ error: "description required." })
        }
        if (!coinId) {
            return res.status(400).json({ error: "Coin id is required" })
        }
        const newComment = new Comment({
            description: description.trim(),
            user: req.user.id,
            coinId,
        })
        await newComment.save()
        await newComment.populate("user", "username")
        res.status(201).json(newComment)

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message, message: "failed to create comment" })
    }
}

export const getComments = async (req, res) => {
    try {
        const { coinId } = req.params
        if (!coinId) {
            return res.status(400).json({ error: "Coin id is required" })
        }
        const comment = await Comment.find({ coinId }).populate("user", "username").sort({ createdAt: -1 })
        res.status(200).json(comment)

    } catch (error) {
        console.error("Error while fetching comment", error.message);
        res.status(500).json({ error: "failed to fetch a comment" })
    }
}


export const voteSentiment = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "login is required to vote" })
        }
        const { coinId } = req.params
        const { sentiment } = req.body
        if (!coinId) {
            return res.status(400).json({ error: "Coin id is required" })
        }
        if (!sentiment || !["bullish", "bearish"].includes(sentiment.toLowerCase())) {
            return res.status(400).json({ error: "Valid sentiment is required" })
        }
        const existing = await Sentiment.findOneAndUpdate(
            { user: req.user.id, coinId },
            { sentiment: sentiment.toLowerCase() },
            { new: true, upsert: true },
        )
        res.status(200).json(existing)
    } catch (error) {
        res.status(500).json({ error: "Failed to record sentiment vote" });
    }
}

export const getSentimentStats = async (req, res) => {
    try {
        const { coinId } = req.params;
        if (!coinId) {
            return res.status(400).json({ error: "Coin id is Required" })
        }
        const stats = await Sentiment.aggregate([
            { $match: { coinId } },
            { $group: { _id: "$sentiment", count: { $sum: 1 } } }
        ])
        const response = { bullish: 0, bearish: 0 };
        stats.forEach((item) => {
            if (item._id === 'bullish' || item._id === 'bearish') {
                response[item._id] = item.count;
            }
        });
        const total = response.bullish + response.bearish
        const bullishPercentage = total > 0 ? ((response.bullish / total) * 100).toFixed(2) : "0";
        const bearishPercentage = total > 0 ? ((response.bearish / total) * 100).toFixed(2) : "0";

        res.status(200).json({ response, total, bullishPercentage, bearishPercentage, bullish: response.bullish, bearish: response.bearish });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch sentiment statistics" });
    }
}