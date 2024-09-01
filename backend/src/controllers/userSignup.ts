import { Request, Response } from "express";
import passwordHash from "../utils/passwordHash";
import User from "../Model/UserModel";

export default async (req: Request, res: Response) => {
    try {
        const data = req.body
        data.password = passwordHash(data.password)
        const user = new User(data)
        await user.save()
        res.status(201).json({ success: true, message: "User created Successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }


}