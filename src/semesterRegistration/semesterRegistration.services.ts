import status from 'http-status';
import AcademicSemester from '../academicSemester/academicSemester.model';
import appError from '../errors/appErrors';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import queryBilder from '../builder/queryBilder';
import { registrationStatus } from './semesterRegistrationConstant';

const createSemseterRegistration=async(payload:TSemesterRegistration)=>{
const academicSemester=payload.academicSemester;

//check if there any registred semester that is "ongoing" | "upcoming"

const isThereAnyUpcomingOrOngoingSemester=await SemesterRegistration.findOne({
    $or:[{status:registrationStatus.UPCOMING},{status:registrationStatus.ONGOING}],
})
if(isThereAnyUpcomingOrOngoingSemester){
    throw new appError(status.BAD_REQUEST,`there is already a ${isThereAnyUpcomingOrOngoingSemester.status} registred semester`)
}

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
const meta=await semesterRegistration.countTotal() 
return {
    meta,
    result
}
}

const getSingleSemesterRegistration=async(id:string)=>{
const result=await SemesterRegistration.findById(id).populate('academicSemester')
return result
}

const updateSemesterRegistration=async(id:string,payload:Partial<TSemesterRegistration>)=>{
    //check if the request registered is already exists
 const isSemesterRegistrationExists=await SemesterRegistration.findById(id)
 if(!isSemesterRegistrationExists){
    throw new appError(status.NOT_FOUND,"this semester is not found !!")
 } 

 //check if the semester registration is ended, we will not update anything
const currentSemesterStatus=isSemesterRegistrationExists.status ;

 if(currentSemesterStatus===registrationStatus.ENDED){
    throw new appError(status.BAD_REQUEST,`this semester is already ${currentSemesterStatus}`)
 }
// check 'UPCOMING' ----> 'ONGOING' ---> 'ENDED'
const RequestSemesterRegistration=payload.status ;

if(currentSemesterStatus === registrationStatus.UPCOMING && RequestSemesterRegistration === registrationStatus.ENDED){
  throw new appError(status.BAD_REQUEST,`you can not directly change status from ${currentSemesterStatus} to ${RequestSemesterRegistration}`)
}

if(currentSemesterStatus === registrationStatus.ONGOING && RequestSemesterRegistration === registrationStatus.UPCOMING){
    throw new appError(status.BAD_REQUEST,`you can not directly change status from ${currentSemesterStatus} to ${RequestSemesterRegistration}`)
}

const result= await SemesterRegistration.findByIdAndUpdate(id,payload,{new:true,runValidators:true})
return result

}


export const SemesterRegistrationServices={
    createSemseterRegistration,
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration
}