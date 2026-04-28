import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";
import { authRepo } from "../repo/auth.repo";
import { jwtSecret } from "../config/config";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const protect = async(req:Request,res:Response,next:NextFunction)=>{
    try {
        let token ; 
        if(req.headers.authorization?.startsWith("Bearer")){
          
            token = req.headers.authorization.split(" ")[1];
        }
 
        if(!token){
            return  next( new AppError('token expire login in again',404))
        }

        const decode:any = jwt.verify(token,jwtSecret);

        const currenuser = await authRepo.findById(decode.id);
        if(!currenuser){
            return next(new AppError('user of thi token not exists',404))
        }

        req.user = currenuser;
        next();
    } catch (error) {
      return  next( new AppError('invalid token',404))
    }
}