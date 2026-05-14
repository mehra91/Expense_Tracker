import User from '../Models/userModel'
import jwt from 'jsonwebtoken'

const jwtSecret = process.env.JWTSECRET

const authMiddleware = async(req,res,next)=>{

}