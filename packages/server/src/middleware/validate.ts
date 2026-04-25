import type { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export const validate = (schema: ZodType<any,any,any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      return next();
    } catch (error: any) {
      next(error);
    }
  };
};
