import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { authService } from "./auth-service";
import { sendSuccessResponse } from "../../utils/response";

const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;

    const { refreshToken, accessToken } = await authService.loginToDb(payload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

    sendSuccessResponse(res, {
      success: true,
      statusCode: 200,
      message: "User log in successful",
      data: {
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });
  },
);

export const authController = { loginController };
