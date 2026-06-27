import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { authService } from "./auth-service";
import { sendSuccessResponse } from "../../utils/response";
import { StatusCodes } from "http-status-codes";

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
      sameSite: "none",
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

const refreshTokenController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new Error(
        "You are not logged in. Please log in to access this resource.",
      );
    }

    const { accessToken } = await authService.refreshTokenService(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24,
    });

    sendSuccessResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Access token created",
      data: { accessToken },
    });
  },
);

export const authController = { loginController, refreshTokenController };
