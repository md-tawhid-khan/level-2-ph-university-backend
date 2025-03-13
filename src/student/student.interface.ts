import { Types } from "mongoose"

export type TName={
    firstName:string,
    middleName?:string,
    lastName:string
}

export type TGuardian={
    name:string,
    relationWithStudent:string,
    ocupation:string,
    contactNo:string,
}

export type TlocalGuardian={
    name:string,
    relationWithStudent:string,
    ocupation:string,
    contactNo:string,
}

export type TStudent={
    id:string,
    user:Types.ObjectId,
    name:TName,
    gender:'male'|'female'|'other',
    dateOfBirth:string,
    email:string,
    contactNo:string,
    emergencyContactNo:string,
    presentAddress:string,
    permanentAddress:string,
    guardian:TGuardian,
    localGuardian:TlocalGuardian,
    profileImage:string,
    
    academicDepartment:string,
    isDeleted:boolean,
    createAt:Date,
    updateAt:Date

}