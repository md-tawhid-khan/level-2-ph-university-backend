
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utily/catchAsync';
import appError from '../errors/appErrors';
import status from 'http-status';
import config from "../app/config";
import { TUser_role } from "../user/user.interface";
import { User } from "../user/user.model";

const authTokenValidation = (...requiredRoles:TUser_role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization

    if(!token){
        throw new appError(status.UNAUTHORIZED,'you are not authorized !!!')
    }

 //--------------------
 let decoded
    try {
       decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

    } catch (error) {
      throw new appError(status.UNAUTHORIZED, "you are not authorized")
    }
    
    
    const {role ,userId:id,iat}=decoded;
    

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



  if(requiredRoles && !requiredRoles?.includes(role)){
    throw new appError(status.UNAUTHORIZED,'you are not authorized or your token is not valid !!!')
  }

 req.user=decoded as JwtPayload
   next()

  //--------------------

  });
};

export default authTokenValidation;