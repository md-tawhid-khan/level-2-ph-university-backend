import { TAdmin } from "./admin.interface"
import { Admin } from "./admin.model"

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


export const adminServices={
    getAllAdminFromDB,
    getSingleAdminFromDB,
    updateAdminIntoDB
}