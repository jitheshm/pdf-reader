import { Router } from "express";
import userSignup from "../controllers/userSignup";
import userLogin from "../controllers/userLogin";

const userRouter = Router();

userRouter.post('/signup',userSignup)
userRouter.post('/login',userLogin)

export default userRouter;
