import express from "express"
import { verifyToken } from "../middlewares/verifytoken.js"
import { getSentimentStats,voteSentiment } from "../controllers/comment.controller.js"


const router=express.Router()

router.get("/:coinId",getSentimentStats)
router.post("/:coinId",verifyToken,voteSentiment)

export default router