import { Router } from "express";
import userSignup from "../controllers/userSignup";
import userLogin from "../controllers/userLogin";
import userLogout from "../controllers/userLogout";

const userRouter = Router();

userRouter.post('/signup',userSignup)
userRouter.post('/login',userLogin)
userRouter.post('/logout',userLogout)

export default userRouter;
