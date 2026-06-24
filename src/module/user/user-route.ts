import { Router } from "express";
import { registerUser } from "./user-controller";

const userRoute = Router();

userRoute.post("/register", registerUser);

export default userRoute;
