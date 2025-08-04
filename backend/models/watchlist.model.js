import mongoose, { Schema } from "mongoose"

const watchlistSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    coinSymbol:{
        type:String,
        required: true,
    },
},{timestamps:true})

export default mongoose.model("Watchlist",watchlistSchema)