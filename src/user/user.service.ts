
import config from '../app/config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser, } from './user.interface';
import { User } from './user.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import {   generateFacultyId, generateStudentId } from './user.utily';
import appError from '../errors/appErrors';
import mongoose from 'mongoose';
import status from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';



const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password

  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

   //find academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)
  
  if (!admissionSemester) {
    throw new appError(404,"admission semester not found");
  }

  const session=await mongoose.startSession()

try {
  session.startTransaction()
  // set manually generated it
  
  userData.id =await generateStudentId(admissionSemester)

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

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if password is not given use default password

  

  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // console.log(userData)

   //find academic semester info
  const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment)
  
  if (!academicDepartment) {
    throw new appError(404,"academic department not found");
  }
//  console.log(academicDepartment)

  const session=await mongoose.startSession()
 

  try{
    session.startTransaction()
    
    //set manually generated it
    userData.id=await generateFacultyId()

   

    //create a user (transcetion-1) 
   const newUser= await User.create([userData],{session}) //array
    
   //create a faculty --------------
     if (!newUser.length) {
    throw new appError(status.BAD_REQUEST,"failed to create user")
  }
    
   //set id,_id as user 

    payload.id = newUser[0].id ;
    payload.user = newUser[0]._id; //reference _id

   

   // create a student (transaction-2)
    const newFaculty = await Faculty.create([payload], { session });

    
    
    // console.log('newFaculty',newFaculty)
    
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

export const userServices = {
  createStudentIntoDB,
  createFacultyIntoDB
};
