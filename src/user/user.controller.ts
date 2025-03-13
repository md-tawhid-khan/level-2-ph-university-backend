import { Request, Response } from "express";
import { userServices } from "./user.service";

const createStudent=async(req:Request,res:Response)=>{
    try {
        const {password,student:studentData}=req.body;

        const result=await userServices.createStudentIntoDB(password,studentData)
        res.json({
           status:true,
           message:'successfully create user',
           data:result
        })
   }
     catch (error) {
        res.json({
            status:false,
            message:'something went wrong',
            error
        })
    }
}

export const  userController={
    createStudent
}