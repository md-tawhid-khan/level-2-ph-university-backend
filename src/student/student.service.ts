import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import appError from '../errors/appErrors';
import status from 'http-status';
import { User } from '../user/user.model';
import queryBilder from '../builder/queryBilder';
import { studentSearchableField } from './studentConstant';


const getAllStudent = async (query:Record<string,unknown>) => {
  /*

// get all student data without query  
  if(Object.keys(query).length===0){
    const result=await Student.find().populate('admissionSemester').populate({
      path:'academicDepartment',
      populate:{
        path:'academicFaculty'
      }
    }).populate('user');
    return result
  }

  // If query is provided, proceed with search, filtering, pagination,  sorting, and select 

  // {email:{$regex : query.searchTerm,$option:'i'}}
  // {'name.firstName':{$regex:query.searchTerm,$option:'i'}}
  // {presentAddress:{$regex:query.searchTerm,$option:'i'}}

 
  const queryObject={...query} //copy query

 
   const studentSearchableField=['email','name.firstName','presentAddress'] ;

   //searching

   let searchTerm ='' ; 
  if(query?.searchTerm){
    searchTerm=query?.searchTerm as string ;
  } ;

  
  const searchQuery= Student.find({
    $or:studentSearchableField.map((field)=>({
      [field]:{$regex:searchTerm, $options:'i'}
    }))
  }
);


  //filtering

  const excludeField=['searchTerm','sort','limit','page','fields'] ;
  
  excludeField.forEach((el)=>delete queryObject[el]) ;

  console.log({query},{queryObject})

  const filterQuery =  searchQuery.find(queryObject).populate('admissionSemester').populate({
    path:'academicDepartment',
    populate:{
      path:'academicFaculty'
    }
  }).populate('user');

  //sorting

  let sort='-createdAt'

  if(query.sort){
    sort=query.sort as string
  }
  
  const sortQuery= filterQuery.sort(sort)

  //limiting

  let page = 1 ;
  let limit = 1 ;
  let skip = 0 ;

  if(query.page){
    page=Number(query.page)  ;
    skip=Number((page-1)*10) ;
    limit=Number(query.limit) ;
  }
  
  if(query.limit){
    limit=Number(query.limit )
  }

  
   
 const paginationQuery=sortQuery.skip(skip)

 const limitQuery = paginationQuery.limit(limit)

//fields limiting

  let fields='-__v'

  if(query.fields){
    fields=(query.fields as string).split(',').join(' ')
    // console.log({fields})
  }

  const fieldQuery=await limitQuery.select(fields)

     return fieldQuery
     */

     const studentQuery=new queryBilder(
      Student.find().populate('admissionSemester').populate({
        path:'academicDepartment',
        populate:{
          path:'academicFaculty'
        }
      }).populate('user'),query).search(studentSearchableField).filter().sort().paginate().fields()

      const result=await studentQuery.modelQuery ;

      return result

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
