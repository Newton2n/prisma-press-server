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
  async (req: Request, res: Response, next: NextFunction) => {},
);

// get a list of page
const getAll = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// get post stats
const getStats = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// get log in user all post
const getMy = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

//get single post
const getById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

//delete post
const remove = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
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
