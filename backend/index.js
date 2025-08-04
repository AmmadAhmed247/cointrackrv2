import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./libs/connectDb.js"
import coinRoute from "./routes/coin.route.js"
import userRoute from "./routes/user.route.js"
import commentRoute from "./routes/comment.route.js"
import sentimentRoute from "./routes/sentiment.route.js"

import cookieParser from "cookie-parser";


dotenv.config()
const app=express()
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json());
app.use(cookieParser());

app.use("/api/coins",coinRoute)
app.use("/api/user",userRoute)
app.use("/api/comment",commentRoute)
app.use("/api/sentiment",sentimentRoute)
connectDb()


app.listen(3000,()=>{
    console.log("Server is running");
    
});