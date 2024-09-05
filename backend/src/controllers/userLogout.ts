import { Request, Response } from "express";
import passwordHash from "../utils/passwordHash";

export default async (req: Request, res: Response) => {
    try {
        res.clearCookie('pdfreaderauth')

        res.status(200).json({ success: true, message: "User Logout Successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "internal server error" })
    }


}