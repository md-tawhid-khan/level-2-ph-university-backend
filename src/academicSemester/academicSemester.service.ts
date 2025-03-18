import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemesterIntoDB = async (data: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[data.name] !== data.code) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.create(data);
  return result;
};

const getAllAcademicSemesterFromDB=async()=>{
    const result= await AcademicSemester.find()
    return result
}

const getSingleAcademicSemesterFromDB=async(id:string)=>{
    const result= await AcademicSemester.findById(id)
    return result
}

const updateAcademicSemesterInformation=async(id:string,payload:TAcademicSemester)=>{
    if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error('invalide semester code to update')
    }
    const result=await AcademicSemester.findByIdAndUpdate(id,payload)
    return result
}

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterInformation
};