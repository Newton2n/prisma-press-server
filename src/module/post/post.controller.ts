import { postService } from "./post.service";
import { catchAsync } from "../../utils/catch-async";
import { NextFunction, Request, Response } from "express";

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

//create a post
const create = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {},
);

// update post
const update = catchAsync(
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
