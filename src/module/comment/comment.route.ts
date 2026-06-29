import { Router } from "express";
import { commentController } from "./comment.controller";
import { Role } from "../../../generated/prisma/enums";
import { authMiddleware } from "../../middleware/auth";

const commentRouter = Router();

//Lists comments written by a specific author.
commentRouter.get("/author/:authorId", commentController.getAllByUserId);

// get comment with selected post information.
commentRouter.get("/:commentId", commentController.getById);

// Creates a comment for a post.
commentRouter.post(
  "/",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentController.create,
);

//update a comment
commentRouter.patch(
  "/:commentId",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentController.update,
);

// delete comment
commentRouter.delete(
  "/:commentId",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentController.remove,
);

// Changes comment moderation status
commentRouter.patch(
  "/:commentId/moderate",
  authMiddleware.auth(Role.ADMIN),
  commentController.changeStatus,
);

export default commentRouter;
