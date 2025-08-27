import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import appError from '../errors/appErrors';
import status from 'http-status';
import { User } from '../user/user.model';
import queryBilder from '../builder/queryBilder';
import { studentSearchableField } from './studentConstant';


const getAllStudent = async (query:Record<string,unknown>) => {
 
     const studentQuery=new queryBilder(
      Student.find().populate('admissionSemester')
      .populate({
        path:'academicDepartment',
        populate:{
          path:'academicFaculty'
        }
      })
      .populate('user'),query)
      .search(studentSearchableField).filter().sort().paginate().fields()

      
      const result=await studentQuery.modelQuery ;
      const meta= await studentQuery.countTotal()

      return {
        meta,
        result
}
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findById(id).populate('admissionSemester').populate({
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

  const result = await Student.findByIdAndUpdate({id}, modifiedUpdateData, { new: true,runValidators:true }); 
  return result;

};

//------------delete student data ------------

const deleteStudent = async (id: string) => {
  const session=await mongoose.startSession()
  try {
    session.startTransaction()

    const deleteStudent = await Student.findByIdAndUpdate({id},{isDeleted:true} ,{ new: true,session});

    if(!deleteStudent){
      throw new appError(status.BAD_REQUEST,"failed to delete student data")
    }

    const deleteUser= await User.findByIdAndUpdate({id},{isDeleted:true},{new:true,session})
   
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
