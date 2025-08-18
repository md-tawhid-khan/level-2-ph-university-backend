
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utily/catchAsync';
import appError from '../errors/appErrors';
import status from 'http-status';
import config from "../app/config";

const authTokenValidation = () => {
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

 req.user=decoded as JwtPayload
   next()
});

  
  });
};

export default authTokenValidation;