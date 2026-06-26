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

//get me controller

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    const verifyToken = await jwtUtils.verifyToken(
      accessToken,
      config.jwt_access_secret!,
    );

    if (typeof verifyToken === "string") {
      throw new Error(verifyToken);
    }

    const result = await userService.getMeFromDb(verifyToken.id);

    sendSuccessResponse(res, {
      statusCode: 200,
      success: true,
      message: "user get successful",
      data: result,
    });
  },
);

export const userController = { registerUser, getMyProfile };
