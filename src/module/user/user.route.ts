import { Router } from "express";
import { userController } from "./user.controller";
import { authMiddleware } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.get(
  "/me",
  authMiddleware.auth(Role.AUTHOR, Role.USER, Role.ADMIN),
  userController.getMyProfile,
);
userRouter.put(
  "/my-profile",
  authMiddleware.auth(Role.AUTHOR, Role.USER, Role.ADMIN),
  userController.updateProfile,
);

export default userRouter;
