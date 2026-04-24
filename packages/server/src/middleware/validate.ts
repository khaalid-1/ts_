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
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: false,
          error: error.issues.map((e) => ({
            filed: e.path[e.path.length - 1],
            message: e.message,
          })),
        });
      }
      return res.status(500).json({
        status: false,
        error: "Internal Server Error",
      });
    }
  };
};
