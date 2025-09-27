import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelpers/AppError";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV === "development") {
        console.log(err);
    }
    let statusCode = 500
    let message = "Something went wrong!!"

    if (err instanceof AppError) {
        statusCode = err.statusCode
        message = err.message
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message
    }

      res.status(statusCode).json({
        success: false,
        message,
        err: process.env.NODE_ENV === "development" ? err : null,
       

    })

}