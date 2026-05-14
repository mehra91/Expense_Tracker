import express from express;
import { registerUser,loginUser,getCurrentUser,updateUser,changePassword } from "../Controllers/userController";

const userRouter = express.Router();

userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);
