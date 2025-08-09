import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./libs/connectDb.js"
import coinRoute from "./routes/coin.route.js"
import userRoute from "./routes/user.route.js"
import commentRoute from "./routes/comment.route.js"
import sentimentRoute from "./routes/sentiment.route.js"
import {connectToBybit,getLiquidations} from "./services/bybit.js"
import cookieParser from "cookie-parser";


dotenv.config()
const app=express()
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json());
app.use(cookieParser());
connectToBybit()
app.use("/api/coins",coinRoute)
app.get('/api/liquidations',(req , res)=>{
    const limit=parseInt(req.query.limit) || 50;
    const data=getLiquidations().slice(-limit)
    res.json(data)
})
app.use("/api/user",userRoute)
app.use("/api/comment",commentRoute)
app.use("/api/sentiment",sentimentRoute)
connectDb()


app.listen(3000,()=>{
    console.log("Server is running");
    
});