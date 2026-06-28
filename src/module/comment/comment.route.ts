import { Router } from "express";
import { commentController } from "./comment.controller";

const commentRouter = Router();

//Lists comments written by a specific author.
commentRouter.get("/author/:authorId", commentController.getAllByUserId);

// get comment with selected post information.
commentRouter.get("/:commentId", commentController.getById);

// Creates a comment for a post.
commentRouter.post("/", commentController.create);

//update a comment
commentRouter.patch("/:commentId", commentController.update);

// delete comment
commentRouter.delete("/:commentId", commentController.remove);

// Changes comment moderation status
commentRouter.patch("/:commentId/moderate", commentController.getAllByUserId);

export default commentRouter;
