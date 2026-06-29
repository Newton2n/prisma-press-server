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
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;

    if (!commentId) {
      throw new Error("Comment Id required");
    }

    const result = await commentService.getById(commentId as string);

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Comment Retrieved successfully",
      data: {
        result,
      },
    });
  },
);

//create comment
const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { content, postId } = req.body;

    const authorId = req.user?.id;

    if (!content || !postId || !authorId) {
      throw new Error("All Fields Are Required");
    }

    const comment = await commentService.create(content, postId, authorId);

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Comment Created successfully",
      data: {
        comment,
      },
    });
  },
);

//Updates the current user’s own comment.
const update = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const userId = req.user?.id;
    const { content } = req.body;

    if (!commentId || !userId || !content) {
      throw new Error("All Fields Are Required");
    }

    const result = await commentService.update(
      commentId as string,
      content,
      userId,
    );

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Comment updated successfully",
      data: {
        result,
      },
    });
  },
);

// Deletes the current user’s own comment.
const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const userId = req.user?.id;

    if (!commentId || !userId) {
      throw new Error("All Fields Are Required");
    }

    const result = await commentService.remove(commentId as string, userId);

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Comment deleted successfully",
      data: {
        result,
      },
    });
  },
);

//Changes comment moderation status.
const changeStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { status } = req.body;
    const { commentId } = req.params;

    if (!status || !commentId) {
      throw new Error("All Fields Are Required");
    }

    if(!["APPROVED","REJECT"].includes(status)){
      throw new Error("Invalid Comment Status")
    }

    const updateStatus =await commentService.changeStatus(
      status,
      commentId as string,
    );

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Comment Status updated successfully",
      data: {
        updateStatus,
      },
    });
  },
);

export const commentController = {
  getAllByUserId,
  getById,
  create,
  update,
  remove,
  changeStatus,
};
