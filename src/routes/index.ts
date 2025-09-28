import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { postRouter } from "../modules/post/post.routes";

 
export const router = Router()


const moduleRoutes = [
    {
        path: "/user",
        router: userRouter
    },
    {
        path: "/post",
        router: postRouter
    },
    // {
    //     path: "/auth",
    //     router: AuthRouter
    // },
  
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.router)
})