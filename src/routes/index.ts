import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";
import { postRouter } from "../modules/post/post.routes";
import { authRouter } from "../modules/Auth/auth.routes";
import { projectRouter } from "../modules/project/project.routes";

 
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
     {
        path: "/project",
        router: projectRouter
    },
    {
        path: "/auth",
        router: authRouter
    },
  
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.router)
})