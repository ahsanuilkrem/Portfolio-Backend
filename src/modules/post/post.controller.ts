import { Request, Response } from "express"
import { PostService } from "./post.service"
import { catchAsync } from "../../utils/catchAsyncts"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes';


const createPost = catchAsync(async (req: Request, res: Response) => {

    const result = await PostService.createPost(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "post Created Successfully",
        data: result,

    })

})

const getAllPosts = catchAsync(async (req: Request, res: Response) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = (req.query.search as string) || "";
    const isFeatured = req.query.isFeatured ? req.query.isFeatured === "true" : undefined
    const tags = req.query.tags ? (req.query.tags as string).split(",") : []

    const result = await PostService.getAllPosts({ page, limit, search, isFeatured, tags });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All posts Retrieved Successfully",
        data: result,

    })

})

const getPostById = catchAsync(async (req: Request, res: Response) => {

    const post = await PostService.getPostById(Number(req.params.id));

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Your post by Id Retrieved Successfully",
        data: post,

    })

})

const updatePost = catchAsync(async (req: Request, res: Response) => {

    const post = await PostService.updatePost(Number(req.params.id), req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "post Updated Successfully",
        data: post,

    })

})

const deletePost = catchAsync(async (req: Request, res: Response) => {

    await PostService.deletePost(Number(req.params.id));

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "post delete Successfully",
        data: null,

    })

})

const getBlogStat = catchAsync(async (req: Request, res: Response) => {

    const result = await PostService.getBlogStat();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Blog Stat Successfully",
        data: result,

    })

})



export const PostController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getBlogStat
}