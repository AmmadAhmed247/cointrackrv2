import express from "express"
import { getComments,createComment } from "../controllers/comment.controller.js"
import { verifyToken } from "../middlewares/verifytoken.js"

const router=express.Router()
router.get("/:coinId",getComments)
router.post("/:coinId",verifyToken,createComment)

export default router