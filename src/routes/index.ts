import { Router } from "express";
import { userRouters } from "../user/user.router";
import { studentRouters } from "../student/student.router";

const router=Router()

const modulesRouters=[{
    path:'/users',
    route:userRouters
},
{
   path:'/students',
   route:studentRouters
}
]

modulesRouters.forEach(route=>router.use(route.path,route.route))

export default router ;