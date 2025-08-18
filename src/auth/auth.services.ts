import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import jwt from "jsonwebtoken"
import status from "http-status";
import appError from "../errors/appErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from '../app/config';


const loginUser=async(paylod:TLoginUser)=>{
    const isUserExist=await User.isUserExistByCustomId(paylod?.id)
    
    if(!isUserExist){
        throw new appError(status.NOT_FOUND,'do not find user in DB')
    }
    const isDelete=isUserExist.isDeleted 
    if(isDelete){
        throw new appError(status.FORBIDDEN,' user in already deleted')
    }
   const userStatus=isUserExist.status

   if(userStatus === 'blocked'){
       throw new appError(status.FORBIDDEN,' user is already blocked ! !')
   }

   // check if the password is correct
   const isPasswordMatch=await User.isPasswordMatched(paylod.password,isUserExist.password)
if(!isPasswordMatch){
    throw new appError(status.NOT_FOUND,'do not matched password')
}

   //Access Granted, Send Access Token, Refresh Token


    return {
     
    }
}

export const authServices={
    loginUser
}