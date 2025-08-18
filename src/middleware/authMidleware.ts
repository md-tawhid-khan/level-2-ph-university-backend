
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utily/catchAsync';
import appError from '../errors/appErrors';
import status from 'http-status';

const authTokenValidation = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization

    if(!token){
        throw new appError(status.UNAUTHORIZED,'you are not authorized !!!')
    }

    // console.log(token)
    next()
  });
};

export default authTokenValidation;