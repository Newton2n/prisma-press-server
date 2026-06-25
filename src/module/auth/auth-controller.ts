import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { authService } from "./auth-service";
import { sendSuccessResponse } from "../../utils/response";

const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const result = await authService.loginToDb(payload);
    sendSuccessResponse(res, {
      success: true,
      statusCode: 200,
      message: "User log in successful",
      data: result,
    });
  },
);

export const authController = { loginController };
