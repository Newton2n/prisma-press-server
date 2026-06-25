import { Router } from "express";
import { authController } from "./auth-controller";

const authRoute = Router();

authRoute.post("/login", authController.loginController);

export default authRoute;
