import { NextFunction, Request, Response } from "express";
import CustomRequest from "../interfaces/CustomRequest";
import jwt from 'jsonwebtoken'

export default (req: CustomRequest, res: Response, next: NextFunction) => {
    const JWT_TOKEN = process.env.JWT_TOKEN


    const token = req.cookies.pdfreaderauth
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Authorization token missing" });
    }
    try {
        console.log(JWT_TOKEN);
        
        const decoded = jwt.verify(token, JWT_TOKEN!) as { id: string };
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}