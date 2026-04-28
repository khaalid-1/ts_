import { authRepo } from "../repo/auth.repo";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { expireIn, jwtSecret } from "../config/config";

export const authService = {
  createUser: async (userData: any) => {
    const { name, email, password } = userData;
    const emailExist = await authRepo.findByEmail(email);
    if (emailExist) {
      throw new AppError("Email already existed", 404);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await authRepo.create({
      ...userData,
      password: hashPassword,
    });

    const token = generateToken(newUser.id);
    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      
      },
      token,
    };
  },
  login: async (credential: any) => {
    const { email, password } = credential;
    const user = await authRepo.findByEmail(email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError("Email or password are incorrect", 404);
    }
    const token = generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  },
};

const generateToken = (id: number) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: expireIn });
};
