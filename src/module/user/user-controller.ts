import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userService } from "./user-service";

//register user
export const registerUser = async (req: Request, res: Response) => {
  const payload = req.body;

  try {
    const result = await userService.registerUserIntoDb(payload);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "user created successful",
      data: {
        user: result,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong ",
      StatusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      errorDetails: (error as Error).message,
    });
  }
};
