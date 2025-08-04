import express from "express"
import {verifyToken} from "../middlewares/verifytoken.js"
const router=express.Router()


import { Login,registerUser ,signout} from "../controllers/user.controller.js"

router.post("/register",registerUser)
router.post("/login",Login)
router.get("/signout",signout)
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: "You are logged in!", user: req.user });
});



export default router