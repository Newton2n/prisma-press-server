import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
const userRoute = Router();

userRoute.post("/register", userController.registerUser);
userRoute.get(
  "/me",
  authMiddleware.auth(Role.AUTHOR, Role.USER, Role.ADMIN),
  userController.getMyProfile,
);
userRoute.put(
  "/my-profile",
  authMiddleware.auth(Role.AUTHOR, Role.USER, Role.ADMIN),
  userController.updateProfile,
);

export default userRoute;
