import { Router } from "express";
import { userController } from "./user-controller";
import { authMiddleware } from "../../middleware/auth";
const userRoute = Router();

userRoute.post("/register", userController.registerUser);
userRoute.get("/me", authMiddleware.auth("USER","ADMIN"), userController.getMyProfile);

export default userRoute;
