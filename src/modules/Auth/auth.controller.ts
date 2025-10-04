import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { catchAsync } from "../../utils/catchAsyncts";
import { setAuthCookie } from "../../utils/setCooki";


const credentialsLogin = catchAsync(async (req: Request, res: Response) => {

    const loginInfo = await AuthService.credentialsLogin(req.body)
    setAuthCookie(res, loginInfo)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged in Successfully",
        data: loginInfo,
    })

    
})

const authWithGoogle = catchAsync(async (req: Request, res: Response) => {

    const result = await AuthService.authWithGoogle(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Logged in Successfully",
        data: result,
    })

})

export const AuthController = {
    credentialsLogin,
    authWithGoogle
}