import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../utils/catchAsyncts";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';



const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const result = await UserService.createUser(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: result,
        
    })

})


const getAllUser = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.getAllUser()

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Users Retrieved Successfully",
        data: result,

    })
})


const getUserById = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.getUserById(Number(req.params.id))

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your profile Retrieved Successfully",
        data: result,

    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {

   const result = await UserService.updateUser(Number(req.params.id), req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Updated Successfully",
        data: result,

    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {

   await UserService.deleteUser(Number(req.params.id))

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User delete Successfully",
        data: null,

    })
})



export const UserController = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser


}