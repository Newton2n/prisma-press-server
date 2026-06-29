import { commentService } from "./comment.service";
import { catchAsync } from "../../utils/catch-async";
import { NextFunction, Request, Response } from "express";
import { sendSuccessResponse } from "../../utils/response";
import { StatusCodes } from "http-status-codes";

// get all Lists comments written by a specific author.
const getAllByUserId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;

    if (!authorId) {
      throw new Error("User Id Needed Please Login");
    }

    const result = await commentService.getAllByUserId(authorId as string);

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All comment Retrieved successfully",
      data: {
        result,
      },
    });
  },
);

// get single comment
const getById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

//create comment
const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

//Updates the current user’s own comment.
const update = catchAsync(async () => {
  async (req: Request, res: Response, next: NextFunction) => {};
});

// Deletes the current user’s own comment.
const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

//Changes comment moderation status.
const changeStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

export const commentController = {
  getAllByUserId,
  getById,
  create,
  update,
  remove,
  changeStatus,
};
