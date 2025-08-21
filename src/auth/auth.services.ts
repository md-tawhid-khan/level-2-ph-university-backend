import  jwt, { JwtPayload }  from 'jsonwebtoken';
import status from "http-status";
import appError from "../errors/appErrors";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from '../app/config';
import bcrypt from 'bcrypt'
import { createToken } from "./auth.utils";




const loginUser=async(payload:TLoginUser)=>{
   
    
    // checking if the user is exist

    const isUserExist=await User.isUserExistByCustomId(payload?.id)
    
   

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
   const isPasswordMatch=await User.isPasswordMatched(payload.password,isUserExist.password)
if(!isPasswordMatch){
    throw new appError(status.NOT_FOUND,'do not matched password')
}

   //Access Granted, Send Access Token, Refresh Token

   
   // create token and sent to the client

   const jwtPayload={
    userId:isUserExist.id,
    role:isUserExist.role
   }

//    console.log(jwtPayload)


  const accessToken= createToken(jwtPayload,config.jwt_access_secret as string,config.jwt_access_expire_in as string)

  const refreshToken= createToken(jwtPayload,config.jwt_refresh_secret as string,config.jwt_refresh_expire_in as string);
  

    return {
      accessToken,
      refreshToken,
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

const refreshToken=async(token:string)=>{

  
 //--------------------
    
    const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;

    
    const {userId:id,iat}=decoded;
    

    // console.log({decoded})

    // checking if the user is exist

    const isUserExist=await User.isUserExistByCustomId(id)
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

  if(isUserExist.passwordChangeAt && await User.isJWTIssuedBeforePasswordChange(isUserExist.passwordChangeAt,iat as number)){
    throw new appError(status.UNAUTHORIZED,'you are not authorized and jwt token is created befor you change password')
  }

  const jwtPayload={
    userId:isUserExist.id,
    role:isUserExist.role
   }

//    console.log(jwtPayload)


  const accessToken= createToken(jwtPayload,config.jwt_access_secret as string,config.jwt_access_expire_in as string)

  return {accessToken}


}

const forgetPassword=async(userId:string)=>{

   // checking if the user is exist

    const isUserExist=await User.isUserExistByCustomId(userId)
    
   

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

   const jwtPayload={
    userId:isUserExist.id,
    role:isUserExist.role
   }

//    console.log(jwtPayload)


  const accessToken= createToken(jwtPayload,config.jwt_access_secret as string,'10m')

  



   const resetUILink=`http://localhost:5173?id=${isUserExist.id}&token=${accessToken}`

   console.log(resetUILink)
}

export const authServices={
    loginUser,
    changePassword,
    refreshToken,
    forgetPassword
}