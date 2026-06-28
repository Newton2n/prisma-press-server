import { Router } from "express";
import { postController } from "./post.controller";
import { authMiddleware } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { authController } from "../auth/auth.controller";
const postRouter = Router();

// get all post
postRouter.get("/", postController.getAll);

// get post stats
postRouter.get(
  "/stats",
  authMiddleware.auth(Role.ADMIN),
  postController.getStats,
);

// get all my post
postRouter.get(
  "/my-posts",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR,Role.USER),
  postController.getMy,
);

//get single post
postRouter.get("/:postId", postController.getById);

//create post
postRouter.post(
  "/",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.create,
);

// update post
postRouter.patch(
  "/:postId",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.update,
);

//delete post
postRouter.delete(
  "/:postId",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.remove,
);

export default postRouter;
