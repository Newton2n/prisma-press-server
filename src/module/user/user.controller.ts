import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catch-async";
import { sendSuccessResponse } from "../../utils/response";


//register user controller
const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    console.log("request body", req.body);

    const result = await userService.registerUser(payload);

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
    if (!req.user) {
      throw new Error("Verification failed please log in again");
    }
    console.log("request body", req.body);
    const result = await userService.getMyProfile(req.user?.id);

    sendSuccessResponse(res, {
      statusCode: 200,
      success: true,
      message: "user get successful",
      data: result,
    });
  },
);

const updateProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const payload = req.body;

    if (!userId) {
      throw new Error("Verification failed please log in again");
    }

    console.log("request body", req.body);

    const updateProfile = await userService.updateProfile(
      userId,
      payload,
    );

    sendSuccessResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User updated successful",
      data: updateProfile,
    });
  },
);

export const userController = {
  register,
  getMyProfile,
  updateProfile,
};
