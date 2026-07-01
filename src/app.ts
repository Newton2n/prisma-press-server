import cookieParser from "cookie-parser";
import express, { Application} from "express";
import cors from "cors";
import config from "./config";
import authRouter from "./module/auth/auth.route";
import userRouter from "./module/user/user.route";
import postRouter from "./module/post/post.route";
import commentRouter from "./module/comment/comment.route";
import notFound from "./middleware/notFound";
const app: Application = express();

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

// error handle
app.use(notFound);

export default app;
