import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async";
import { subscriptionService } from "./subscription.service";
import { sendSuccessResponse } from "../../utils/response";
import { StatusCodes } from "http-status-codes";
const checkout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    console.log("user id", userId);

    const result = await subscriptionService.checkout(userId as string);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Check Out Session Created",
      data: result,
    });
  },
);

//check subscription status
const checkSubscriptionStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    console.log("user id", userId);

    const result = await subscriptionService.checkSubscriptionStatus(userId as string);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Subscription Status Retrieved",
      data: result,
    });
  },
);

const webhookHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const signature = req.headers["stripe-signature"];
    const result = await subscriptionService.webhookHandler(
      req.body,
      signature as string,
    );
  },
);
export const subscriptionController = { checkout, webhookHandler,checkSubscriptionStatus };
