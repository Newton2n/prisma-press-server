import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const globalError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Something went wrong ",
    StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    error: error.stack,
  });
};

export default globalError;
