import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "./user-service";
import { catchAsync } from "../../utils/catch-async";
import { sendSuccessResponse } from "../../utils/response";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";

//register user controller
const registerUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const result = await userService.registerUserIntoDb(payload);

    sendSuccessResponse(res, {
      success: true,
      message: "User created successful",
      statusCode: StatusCodes.CREATED,
      data: result,
    });
  },
);

//get my profile controller

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    if(!req.user){
      throw new Error("Verification failed please log in again")
    }

  
    const result = await userService.getMeFromDb(req.user?.id);

    sendSuccessResponse(res, {
      statusCode: 200,
      success: true,
      message: "user get successful",
      data: result,
    });
  },
);

export const userController = { registerUser, getMyProfile };
