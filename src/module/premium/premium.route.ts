import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { premiumController } from "./premium.controller";
import { authMiddleware } from "../../middleware/auth";
import { subscriptionGuard } from "../../middleware/premium-guard";

const router = Router();

router.get(
  "/",
authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  subscriptionGuard(),
  premiumController.getPremiumContent,
);

export const premiumRoutes = router;
