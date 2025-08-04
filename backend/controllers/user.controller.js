import axios from "axios"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js"


export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "User Already Registered" })
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User({
            username, email, password: hashedPassword,
        })

        const savedUser = await newUser.save()
        res.status(200).json({
            message: "New user created Successfully", user: {
                id: savedUser._id,
                username: savedUser.username,
                email: savedUser.email,
            },
        })


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json("User not found")
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json("Invalid Credentials")
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email },
            process.env.JWT_KEY,
            { expiresIn: "7d" },
        )
        res.cookie("token", token)
        return res.status(200).json({
            message: "Login Successfully", user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong", error: error.message })
    }
}

export const signout=async(req , res)=>{
    try {
        res.clearCookie("token")
        res.status(200).json({message:"Logout Successfully"})
    } catch (error) {
        res.status(500).json(error.message)
    }
}