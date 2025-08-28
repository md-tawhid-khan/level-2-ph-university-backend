
import appError from '../errors/appErrors';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';
import queryBilder from '../builder/queryBilder';

const createAcademicSemesterIntoDB = async (data: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[data.name] !== data.code) {
    throw new appError(404,'Invalid semester code');
  }

  const result = await AcademicSemester.create(data);
  return result;
};

const getAllAcademicSemesterFromDB=async(query:Record<string,unknown>)=>{
  const academicSemesterQuery= new queryBilder(AcademicSemester.find(),query)
    const result= await academicSemesterQuery.modelQuery
    const meta=await academicSemesterQuery.countTotal()
    return {
      meta,
      result
    }
}

const getSingleAcademicSemesterFromDB=async(id:string)=>{
    const result= await AcademicSemester.findById(id)
    return result
}

const updateAcademicSemesterInformation=async(id:string,payload:TAcademicSemester)=>{
    if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new appError(404,'invalide semester code to update')
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