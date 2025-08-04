import mongoose, { Schema } from "mongoose";

const commentSchema=new Schema({
    description:{
        type:String,
        required:true
    },
    coinId:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true})

export default mongoose.model("Comment",commentSchema)