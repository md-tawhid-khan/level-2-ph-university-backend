import status from 'http-status';
import AcademicSemester from '../academicSemester/academicSemester.model';
import appError from '../errors/appErrors';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import queryBilder from '../builder/queryBilder';

const createSemseterRegistration=async(payload:TSemesterRegistration)=>{
const academicSemester=payload.academicSemester;

// check if do not exist academic semester 

const isAcademicSemesterExists=await AcademicSemester.findById(academicSemester)
if(!isAcademicSemesterExists){
    throw new appError(status.NOT_FOUND,'this academic semester is not found')
}

// check if already semester registred

const isSemesterRegistrationExists=await SemesterRegistration.findOne({academicSemester})

if(isSemesterRegistrationExists){
    throw new appError(status.CONFLICT,'this semester already exists')
}

const result = await  SemesterRegistration.create(payload)
return result

}

const getAllSemesterRegistration=async(query:Record<string , unknown>)=>{
    const semesterRegistration=new queryBilder(SemesterRegistration.find().populate('academicSemester'),query).fields().filter().paginate().sort()

const result=await semesterRegistration.modelQuery 
return result
}


export const SemesterRegistrationServices={
    createSemseterRegistration,
    getAllSemesterRegistration
}