import { Router } from "express";
import { userRegistration,userLogin,verifyEmail,logoutUser, getUser, verifyUser,refreshAccessToken} from "../controllers/user.controller.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'

const userRouter = Router()

userRouter.route("/register").post(userRegistration);
userRouter.route("/login").post(userLogin);
userRouter.route("/verify-email").get(verifyEmail);
userRouter.route("/logout").post(verifyJWT, logoutUser)
userRouter.route('/profile').get(verifyJWT,getUser)
userRouter.route('/authcheck').get(verifyJWT, verifyUser)
userRouter.route('/refreshToken').get(refreshAccessToken)

export { userRouter }