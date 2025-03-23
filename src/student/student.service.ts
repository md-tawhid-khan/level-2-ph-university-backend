import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import appError from '../errors/appErrors';
import status from 'http-status';
import { User } from '../user/user.model';


const getAllStudent = async (query:Record<string,unknown>) => {

  //{email:{$regex : query.searchTeam,$option:'i'}}
  //{'name.firstName':{$regex:query.searchTeam,$option:'i'}}
  //{presentAddress:{$regex:query.searchTeam,$option:'i'}}

  let searchTeam = '' ;

  if(query?.searchTeam){
    searchTeam=query?.searchTeam as string ;
  }

  const result = await Student.find({
      $or:['email','name.firstName','presentAddress'].map((field)=>({
        [field]:{$regex:searchTeam, $options:'i'}
      }))
    }
  ).populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  }).populate('user');
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({id}).populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  });
  return result;
};

const updateStudent = async (id: string, data:Partial<TStudent>) => {

  const {name,guardian,localGuardian, ...remainingStudentData}=data ;

  const modifiedUpdateData:Record<string,unknown>={
    ...remainingStudentData
  } 

  if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifiedUpdateData[`name.${key}`]=value ;
    }
  }

  if(guardian && Object.keys(guardian).length) {
    for(const [key,value] of Object.entries(guardian)){
      modifiedUpdateData[`guardian.${key}`]=value;
    }
  }

  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key,value] of Object.entries(localGuardian)){
      modifiedUpdateData[`localGuardian.${key}`]=value;
    }
  }

  const result = await Student.findOneAndUpdate({id}, modifiedUpdateData, { new: true,runValidators:true }); 
  return result;
};

const deleteStudent = async (id: string) => {
  const session=await mongoose.startSession()
  try {
    session.startTransaction()

    const deleteStudent = await Student.findOneAndUpdate({id},{isDeleted:true} ,{ new: true,session});

    if(!deleteStudent){
      throw new appError(status.BAD_REQUEST,"failed to delete student data")
    }

    const deleteUser= await User.findOneAndUpdate({id},{isDeleted:true},{new:true,session})
   
    if(!deleteUser){
      throw new appError(status.BAD_REQUEST,"failed to delete user data")
    }

    await session.commitTransaction()
    await session.endSession()

  return deleteStudent;
  } catch (error) {
     await session.abortTransaction()
     await session.endSession()
     throw new appError(status.BAD_REQUEST,"failed to delete student")
  }
  
};

export const studentService = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
