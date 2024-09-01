import { Request, Response } from "express";
import User from "../Model/UserModel";
import verifyPassword from "../utils/verifyPassword";
import jwt from 'jsonwebtoken'

export default async (req: Request, res: Response) => {
    try {
        const JWT_TOKEN = process.env.JWT_Token
        const data = req.body
        const user = await User.findOne({ email: data.email })
        if (user) {
            const result = verifyPassword(data.password, user.password)
            if (result) {
                const data = {
                    email: user.email,
                    id: user._id
                }
                const token = jwt.sign(data, JWT_TOKEN!, { expiresIn: '7d' });

                res.cookie('pdf-reader', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    sameSite: 'strict',
                });

                res.status(200).json({ success: true, message: "User Login Successfully" })
            } else {
                res.status(404).json({ success: false, message: "email or password is invalid" })

            }
        } else {
            res.status(404).json({ success: false, message: "email or password is invalid" })
        }

    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }


}