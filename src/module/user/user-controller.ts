import { NextFunction, Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "./user-service";
import { catchAsync } from "../../utils/catch-async";
import { sendSuccessResponse } from "../../utils/response";
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


export const  userController ={registerUser}
