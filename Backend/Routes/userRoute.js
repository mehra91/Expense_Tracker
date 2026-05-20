import express from 'express';
import { registerUser,loginUser,getCurrentUser,updateUser,changePassword } from "../Controllers/userController.js";
import {authMiddleware} from '../Middleware/auth.js'
const userRouter = express.Router();

// public routes
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);

// protected routes
userRouter.get('/me',authMiddleware,getCurrentUser);
userRouter.put('/profile',authMiddleware,updateUser);
userRouter.put('/password',authMiddleware,changePassword);

export default userRouter;