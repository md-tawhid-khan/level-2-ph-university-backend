import jwt from "jsonwebtoken"
import status from "http-status";
import appError from "../errors/appErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from '../app/config';
import bcrypt from 'bcrypt'




const loginUser=async(paylod:TLoginUser)=>{
    
    // checking if the user is exist

    const isUserExist=await User.isUserExistByCustomId(paylod?.id)
    
//    console.log(isUserExist)

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

   
   // create token and sent to the client

   const jwtPayload={
    userId:isUserExist.id,
    role:isUserExist.role
   }

  const accessToken= jwt.sign({
  jwtPayload
}, config.jwt_access_secret as string, { expiresIn: '10d' });

    return {
      accessToken,
      needsPasswordChanges :isUserExist?.needChangePassword
    }
}


//---------------  change users password -------------------

const changePassword=async(userData:{userId:string ; role:string},payload:{oldPassword:string,newPassword:string})=>{

     const isUserExist=await User.isUserExistByCustomId(userData?.userId)
    
      

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
   const isPasswordMatch=await User.isPasswordMatched(payload.oldPassword,isUserExist.password)
if(!isPasswordMatch){
    throw new appError(status.NOT_FOUND,'do not matched old password')
}

const newHashPassword=await bcrypt.hash(payload.newPassword,Number(config.bcrypt_salt_rounds))


  const result=await User.findOneAndUpdate({
    id:userData.userId,
    role:userData.role
  },{
    password:newHashPassword,
    needChangePassword:false,
    passwordChangeAt:new Date()
  })
  
  return result
}

export const authServices={
    loginUser,
    changePassword
}