import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Something went wrong ",
        StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        errorDetails: (error as Error).message,
      });
    }
  };
};
