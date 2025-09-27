import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";

 
export const router = Router()


const moduleRoutes = [
    {
        path: "/user",
        router: userRouter
    },
    // {
    //     path: "/auth",
    //     router: AuthRouter
    // },
  
]

moduleRoutes.forEach((route) => {
    router.use(route.path, route.router)
})