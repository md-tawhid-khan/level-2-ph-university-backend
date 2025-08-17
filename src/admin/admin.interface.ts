import { Types } from "mongoose";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export type TAdmin={
  id:string,
  user:Types.ObjectId,
  name:TName,
  designation:string,
  gender:string,
  dateOfBirth:string,
  email:string,
  contactNo:string,
  emergencyContactNo:string,
  presentAddress:string,
  permanentAddress:string,
  profileImage:string,
  managementDepartment:Types.ObjectId
  isDelete:boolean
}