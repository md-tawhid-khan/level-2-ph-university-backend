import { Router } from "express";
import { userRouters } from "../user/user.router";

const router=Router()

const modulesRouters=[{
    path:'/users',
    route:userRouters
}
]

modulesRouters.forEach(route=>router.use(route.path,route.route))

export default router ;