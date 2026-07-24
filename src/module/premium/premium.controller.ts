import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catch-async";
import { sendSuccessResponse } from "../../utils/response";
import { premiumServices } from "./premium.service";

const getPremiumContent = catchAsync(
    async (req : Request, res : Response, next : NextFunction)=> {
        const query = req.query;
        const result = await premiumServices.getAllPremiumContent(query)
        
        sendSuccessResponse(res, {
            success:true,
            statusCode : httpStatus.OK,
            message : "Premium Content Retrieved Successfully",
            data : result.data,
            meta : result?.meta
        })
    }
)


export const premiumController = {
    getPremiumContent
}