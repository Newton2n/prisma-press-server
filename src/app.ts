import cookieParser from "cookie-parser";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import authenticationRoute from "./module/authentication/authentication-route";
import userRoute from "./module/user/user-route";
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


app.use("/api/users",userRoute)
app.use("/api/auth",authenticationRoute)


export default app;
