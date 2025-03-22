
import config from '../app/config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { generateStudentId } from './user.utily';
import appError from '../errors/appErrors';
import mongoose from 'mongoose';
import status from 'http-status';


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
    throw new appError(404,"Academic semester not found");
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

export const userServices = {
  createStudentIntoDB,
};
