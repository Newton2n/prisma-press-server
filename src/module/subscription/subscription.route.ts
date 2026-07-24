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
subscriptionRoutes.get(
  "/subscription-status",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  subscriptionController.checkSubscriptionStatus,
);

subscriptionRoutes.post("/webhook", subscriptionController.webhookHandler);
