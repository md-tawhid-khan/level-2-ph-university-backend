import mongoose from "mongoose"
import { TAdmin } from "./admin.interface"
import { Admin } from "./admin.model"
import appError from "../errors/appErrors"
import status from "http-status"
import { User } from "../user/user.model"

const getAllAdminFromDB=async()=>{
    const result=await Admin.find()
    return result
}

const getSingleAdminFromDB=async(id:string)=>{
    const result=await Admin.findById(id)
    return result
}

//---------update admin ----------
const updateAdminIntoDB = async (id: string, data:Partial<TAdmin>) => {

  const {name, ...remainingStudentData}=data ;

  const modifiedUpdateData:Record<string,unknown>={
    ...remainingStudentData
  } 

  if(name && Object.keys(name).length){
    for(const [key,value] of Object.entries(name)){
      modifiedUpdateData[`name.${key}`]=value ;
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdateData, { new: true,runValidators:true }); 
  return result;
};

// ----------------- delete admin data ------------------

const deleteAdminIntoDB = async (id: string) => {
  const session=await mongoose.startSession()
  try {
    session.startTransaction()
 
    const deleteAdmin = await Admin.findOneAndUpdate({id},{isDelete:true} ,{ new: true,session});
        
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

export const adminServices={
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateAdminIntoDB,
    deleteAdminIntoDB
}