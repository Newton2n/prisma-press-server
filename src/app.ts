import cookieParser from "cookie-parser";
import express, { Application } from "express";
import cors from "cors";
import config from "./config";
import authRouter from "./module/auth/auth.route";
import userRouter from "./module/user/user.route";
import postRouter from "./module/post/post.route";
import commentRouter from "./module/comment/comment.route";
import notFound from "./middleware/not-found";
import globalError from "./middleware/global-error";
import { subscriptionRoutes } from "./module/subscription/subscription.route";
import { premiumRoutes } from "./module/premium/premium.route";
const app: Application = express();

const endpointSecret = config.stripe_webhook_secret;

app.use(
  cors({
    origin: config.app_url,
    credentials: true,
  }),
);


app.post(
  "/api/subscription/webhook",
  express.raw({ type: "application/json" }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/premium", premiumRoutes);

// error handle
app.use(notFound);
app.use(globalError);

export default app;
