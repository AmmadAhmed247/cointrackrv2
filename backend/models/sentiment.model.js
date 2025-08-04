import mongoose, { Schema } from "mongoose";


const sentimentSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    coinId:{
        type:String,
        required:true,
    },
    sentiment:{
        type:String,
        enum:["bullish","bearish"],
        required:true,
    }
},{timestamps:true})
sentimentSchema.index({user:1,coinId:1},{unique:true})

export default mongoose.model("Sentiment",sentimentSchema)

