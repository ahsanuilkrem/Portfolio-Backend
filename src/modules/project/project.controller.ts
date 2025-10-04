import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsyncts"
import { sendResponse } from "../../utils/sendResponse"
import  httpStatus  from 'http-status-codes';
import { ProjectService } from "./project.service";



const createProject = catchAsync(async (req: Request, res: Response) => {

    const result = await ProjectService.createProject(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Project Created Successfully",
        data: result,

    })

})


const getAllProject = catchAsync(async (req: Request, res: Response) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";

    const result = await ProjectService.getAllProject({ page, limit, search, });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Project Retrieved Successfully",
        data: result,

    })

})

const getProjectById = catchAsync(async (req: Request, res: Response) => {

    const project = await ProjectService.getProjectById(Number(req.params.id));

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your project by Id Retrieved Successfully",
        data: project,

    })

})


const updateProject = catchAsync(async (req: Request, res: Response) => {

    const project = await ProjectService.updateProject(Number(req.params.id), req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "project Updated Successfully",
        data: project,

    })

})

const deleteProject = catchAsync(async (req: Request, res: Response) => {

     await ProjectService.deleteProject(Number(req.params.id));

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "project Delete Successfully",
        data: null,

    })

})

export const ProjectController = {
    createProject,
    getAllProject,
    getProjectById,
    updateProject,
    deleteProject

}