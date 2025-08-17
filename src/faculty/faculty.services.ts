import mongoose from "mongoose"
import { TFaculty } from "./faculty.interface"
import { Faculty } from "./faculty.model"
import appError from "../errors/appErrors"
import status from "http-status"
import { User } from "../user/user.model"

const getAllFacultyFromDB=async()=>{
     const result=await Faculty.find()
     return result
}

const getSingleFacultyFromDB=async(id:string)=>{
    const result=await Faculty.findById(id)
    return result
}

//---------update  faculty
const updateFacultyIntoDB = async (id: string, data:Partial<TFaculty>) => {

  const {name, ...remainingStudentData}=data ;

  const modifiedUpdateData:Record<string,unknown>={
    ...remainingStudentData
  } 

  if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifiedUpdateData[`name.${key}`]=value ;
    }
  }

  const result = await Faculty.findOneAndUpdate({id}, modifiedUpdateData, { new: true,runValidators:true }); 
  return result;
};

// ----------------- delete admin data ------------------

const deleteFacultyIntoDB = async (id: string) => {
  const session=await mongoose.startSession()
  try {
    session.startTransaction()
 
    const deleteAdmin = await Faculty.findOneAndUpdate({id},{isDelete:true} ,{ new: true,session});
        
    if(!deleteAdmin){
      throw new appError(status.BAD_REQUEST,"failed to delete admin data")
    }

    const deleteUser= await User.findOneAndUpdate({id},{isDeleted:true},{new:true,session})
   
    if(!deleteUser){
      throw new appError(status.BAD_REQUEST,"failed to delete user data")
    }

    await session.commitTransaction()
    await session.endSession()

  return deleteAdmin;
  } catch (error) {
    // console.log(error)
     await session.abortTransaction()
     await session.endSession()
     throw new appError(status.BAD_REQUEST,"failed to delete admin")
  }
  
};

export const facultyServices={
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateFacultyIntoDB,
    deleteFacultyIntoDB
}