
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utily/catchAsync';
import appError from '../errors/appErrors';
import status from 'http-status';
import config from "../app/config";
import { TUser_role } from "../user/user.interface";

const authTokenValidation = (...requiredRoles:TUser_role[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization

    if(!token){
        throw new appError(status.UNAUTHORIZED,'you are not authorized !!!')
    }

    jwt.verify(token, config.jwt_access_secret as string, function(err, decoded) {
  // err
  if(err){
    throw new appError(status.UNAUTHORIZED,'you are not authorized !!!')
  }
  // decoded undefined
 
  const role=(decoded as JwtPayload)?.jwtPayload.role


  if(requiredRoles && !requiredRoles?.includes(role)){
    throw new appError(status.UNAUTHORIZED,'you are not authorized or your token is not valid !!!')
  }

 req.user=decoded as JwtPayload
   next()
});

  
  });
};

export default authTokenValidation;