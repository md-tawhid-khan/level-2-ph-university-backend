/* eslint-disable @typescript-eslint/no-explicit-any */
import { Admin } from './../admin/admin.model';
import config from '../app/config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser, } from './user.interface';
import { User } from './user.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import {   generateAdminId, generateFacultyId, generateStudentId } from './user.utily';
import appError from '../errors/appErrors';
import mongoose from 'mongoose';
import status from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { USER_ROLE } from './user.constant';
import { sendImageToCloudinary } from '../utily/sendImageToCloudinary';





const createStudentIntoDB = async (file:any,password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password

  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';
  // set email in user
  userData.email=payload?.email ;

   //find academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
  
  if (!admissionSemester) {
    throw new appError(404,"admission semester not found");
  }

  // find academic Department

  const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment)

  if(!academicDepartment){
    throw new appError(404,"academic department not found");
  }

payload.academicFaculty=academicDepartment.academicFaculty


  const session=await mongoose.startSession()

try {
  session.startTransaction()
  // set manually generated it
  
  userData.id =await generateStudentId(admissionSemester)

  if(file){

    //send image to cloudinary
const imageName=`${userData.id}${payload?.name.firstName}`

const path=file?.path

//send image to cloudinary
 const imageData=await sendImageToCloudinary(imageName,path)
 payload.profileImage=imageData?.secure_url as string

  }

  //create a user (transaction-1)
  const newUser = await User.create([userData],{session}); //array

  // create a student
  if (!newUser.length) {
    throw new appError(status.BAD_REQUEST,"failed to create user")
  }
  //set id,_id as user 

    payload.id = newUser[0].id ;
    payload.user = newUser[0]._id; //reference _id
    
  // create a student (transaction-2)
    const newStudent = await Student.create(payload);
    if(!newStudent){
      throw new appError(status.BAD_REQUEST,"failed to create student data")
    }

    await session.commitTransaction()
    await session.endSession()
    
    return newStudent;
  
} catch (error) {
  
  await session.abortTransaction()
  await session.endSession()
  throw new Error("failed to create student")
  
}

  
};

const createFacultyIntoDB = async (file:any,password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_password as string);

  //set faculty role
  userData.role = 'faculty';
  // set faculty email
  userData.email=payload?.email;

   //find academic semester info
  const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment)
  
  if (!academicDepartment) {
    throw new appError(404,"academic department not found");
  }
  payload.academicFaculty=academicDepartment.academicFaculty

  const session=await mongoose.startSession()
 

  try{
    session.startTransaction()
    
    //set manually generated it
    userData.id=await generateFacultyId()

    if(file){
  //send image to cloudinary

const imageName=`${userData.id}${payload?.name.firstName}`

const path=file?.path

//send image to cloudinary
 const imageData=await sendImageToCloudinary(imageName,path)

 payload.profileImage=imageData?.secure_url as string
    }

  
    //create a user (transcetion-1) 
   const newUser= await User.create([userData],{session}) //array
    
   //create a faculty --------------
     if (!newUser.length) {
    throw new appError(status.BAD_REQUEST,"failed to create user")
  }

    
   //set id,_id as user 

    payload.id = newUser[0].id ;
    payload.user = newUser[0]._id; //reference _id
   
   // create a faculty (transaction-2)
    const newFaculty = await Faculty.create([payload], { session });
    
    if(!newFaculty){
      throw new appError(status.BAD_REQUEST,"failed to create faculty data")
    }

    await session.commitTransaction()
    await session.endSession()
    
    return newFaculty; 
   

  }
 catch (error) {
  await session.abortTransaction()
  await session.endSession()
  
  throw new Error("failed to create faculty")
  
}
}

// create user for Admin 

const createAdminIntoDB=async(file:any,password:string,payload:TAdmin)=>{
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password
  userData.password = password || (config.default_password as string);

  //set admin role
  userData.role = 'admin';
   // set admin email
  userData.email=payload?.email;

   //find academic semester info
  const managementDepartment = await AcademicDepartment.findById(payload.managementDepartment)
  
  if (!managementDepartment) {
    throw new appError(404,"academic department not found");
  }

 const session=await mongoose.startSession()
 try{
    session.startTransaction()
    
    //set manually generated it
    userData.id=await generateAdminId()

    if(file){
  //send image to cloudinary

const imageName=`${userData.id}${payload?.name.firstName}`

const path=file?.path

//send image to cloudinary
 const imageData=await sendImageToCloudinary(imageName,path)
//  console.log(imageData)
 payload.profileImage=imageData?.secure_url as string
 
    }

    //create a user (transcetion-1) 
   const newUser= await User.create([userData],{session}) //array
    
   //create a faculty --------------
     if (!newUser.length) {
    throw new appError(status.BAD_REQUEST,"failed to create user")
  }
    
   //set id,_id as user 

    payload.id = newUser[0].id ;
    payload.user = newUser[0]._id; //reference _id
    
   // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if(!newAdmin){
      throw new appError(status.BAD_REQUEST,"failed to create Admin data")
    }

    await session.commitTransaction()
    await session.endSession()
    
    return newAdmin; 
   

  }
 catch (error) {
  console.log(error)
  await session.abortTransaction()
  await session.endSession()
  throw new Error("failed to create Admin")  
}

}

//---------------change user's status -----------------
const changeStatus=async(id : string,payload:{status:string})=>{

  const result=await User.findByIdAndUpdate(id,payload,{new:true})

 return result
}
 
//--------- get single user by using token from DB -----------

const getMe=(userId:string,role:string)=>{

 let result=null

 if(role === USER_ROLE.student){
  result = Student.findOne({id: userId}).populate('user')
 }

 if(role  === USER_ROLE.faculty){
  result = Faculty.findOne({id: userId}).populate('user')
 }

 if(role  === USER_ROLE.admin){
  result = Admin.findOne({id:userId}).populate('user')
 }

 return result

}

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  changeStatus,
  getMe
};
