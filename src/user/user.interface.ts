/* eslint-disable no-unused-vars */

import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
  id: string;
  password: string;
  email:string;
  needChangePassword: boolean;
  passwordChangeAt?:Date;
  role: 'admin' | 'faculty' | 'student';
  status?: 'in-progress' | 'blocked';
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser>{
  isUserExistByCustomId(id:string):Promise<TUser>,
  
  isPasswordMatched(myPlaintextPassword:string,hashPassword:string):Promise<boolean>

  isJWTIssuedBeforePasswordChange(passwordChangeTimeStamp:Date,JWTIssusedTimeStamp:number):Promise<boolean>
}

export type TUser_role=keyof typeof USER_ROLE ;










//  export type NewUser={
//      role:string,
//      password:string,
//      id:string
//  }
