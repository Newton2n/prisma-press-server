import { Router } from "express";
import { subscriptionController } from "./subscription.controller";
import { authMiddleware } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
export const subscriptionRoutes = Router();

subscriptionRoutes.post(
  "/checkout",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  subscriptionController.checkout,
);

subscriptionRoutes.post("/webhook", subscriptionController.webhookHandler);
