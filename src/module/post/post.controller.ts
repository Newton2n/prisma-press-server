import { postService } from "./post.service";
import { catchAsync } from "../../utils/catch-async";
import { NextFunction, Request, Response } from "express";
import { sendSuccessResponse } from "../../utils/response";
import { StatusCodes } from "http-status-codes";

//create a post
const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const userId = req.user?.id as string;
    const result = await postService.create(payload, userId);

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Post Created Successfully",
      data: result,
    });
  },
);
// update post
const update = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const payload = req.body;
    const userId = req.user?.id;

    if (!postId || !payload || !userId) {
      throw new Error("All fields are require");
    }

    const isAdmin = req.user?.role === "ADMIN";
    const result = await postService.update(
      postId as string,
      userId!,
      isAdmin,
      payload,
    );

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Post Updated Successfully",
      data: result,
    });
  },
);

// get a list of page
const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await postService.getAll();

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Post Retrieved Successfully",
      data: result,
    });
  },
);

// get post stats
const getStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// get log in user all post
const getMy = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    const result = await postService.getMy(userId as string);

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Post Retrieved Successfully",
      data: result,
    });
  },
);

//get single post
const getById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    if (!postId) {
      throw new Error("Post id Required");
    }
    const result = await postService.getById(postId as string);

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Post Retrieved Successfully",
      data: result,
    });
  },
);

//delete post
const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const userId = req.user?.id;

    if (!postId || !userId) {
      throw new Error("All fields are require");
    }

    const isAdmin = req.user?.role === "ADMIN";
    const result = await postService.remove(postId as string, userId!, isAdmin);

    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Post Deleted Successfully",
      data: result,
    });
  },
);
export const postController = {
  getAll,
  getStats,
  getMy,
  getById,
  create,
  update,
  remove,
};
