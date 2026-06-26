import { Router } from "express";
import { userController } from "./user-controller";

const userRoute = Router();

userRoute.post("/register", userController.registerUser);
userRoute.get("/me", userController.getMyProfile);

export default userRoute;
