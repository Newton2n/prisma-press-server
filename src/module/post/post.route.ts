import { Router } from "express";
import { postController } from "./post.controller";

const postRouter = Router();

// get all post
postRouter.get("/", postController.getAll);

// get post stats
postRouter.get("/stats", postController.getStats);

// get all my post
postRouter.get("/my-posts", postController.getMy);

//get single post
postRouter.get("/:postId", postController.getById);

//create post
postRouter.post("/", postController.create);

// update post
postRouter.patch("/:postId", postController.update);

//delete post
postRouter.delete("/:postId", postController.remove);

export default postRouter;
