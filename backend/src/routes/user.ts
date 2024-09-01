import { Router } from "express";
import userSignup from "../controllers/userSignup";

const userRouter = Router();

userRouter.post('/signup',userSignup)

export default userRouter;
