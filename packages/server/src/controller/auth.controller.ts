import type { Request, Response } from "express";
import { authService } from "../service/auth.service";
import { catchAsync } from "../utils/catchAsync";

export const singup = catchAsync(async (req: Request, res: Response) => {
  const newUser = await authService.createUser(req.body);
  return res.status(201).json({
    status:true,
    message:"new user created!",
    data :newUser
  })
});
export const loging = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.login(req.body);
  return res.status(201).json({
    status:true,
    data :user
  })
});
