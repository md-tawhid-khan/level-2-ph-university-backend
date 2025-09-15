
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";



const findLastStudentId=async(year:string,courseCode:string)=>{
    const regex = new RegExp(`^STU-${year}-${courseCode}`)
    const lastStudent=await User.findOne(
        {
            role:"student",
            id: { $regex: regex }
        },
    {
        id:1,
        _id:0
    },).sort(
        {createdAt:-1}).lean()

        return lastStudent?.id? lastStudent.id : undefined
}

// generated id autometically 
export const generateStudentId=async(payload:TAcademicSemester)=>{
    // first time 0000
    //0001 =>1

    let currentId=(0).toString()

    const lastStudentId=await findLastStudentId(payload.year,payload.code);
    
    //2030 01 0001
    const lastStudentSemesterCode=lastStudentId?.substring(9,11);
    const lastStudentSemesterYear=lastStudentId?.substring(4,8);
    const currentSemesterCode=payload.code;
    const currentYear=payload.year;


    if(lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentSemesterYear === currentYear){
        currentId=lastStudentId.substring(12)
    }
    
    // console.log({currentId})
     
    let incrementId=(Number(currentId)+1).toString().padStart(4,'0')

        // console.log({incrementId})

    incrementId=`STU-${payload.year}-${payload.code}${incrementId}`
    //    console.log('last increment id',incrementId)
    return incrementId
}

//  work for faculty

const findLastFacultyId = async () => {
    const lastFaculty = await User.findOne(
        {
             role: "faculty" 
        },
        { 
            id: 1,
            _id: 0
         }
    )
        .sort({ createdAt: -1 })
        .lean();
     
    return lastFaculty?.id;
};

export const generateFacultyId = async () => {
    let currentId = "0000";

    const lastFacultyId = await findLastFacultyId();

    

    if (lastFacultyId) {
         currentId = lastFacultyId.split("-")[2];
       
    }

    const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    const finalId = `FAC-${new Date().getFullYear()}-${incrementId}`;


    return finalId;
};

// work for admin
const findLastAdminId = async () => {
    const lastFaculty = await User.findOne(
        {
             role: "admin" 
        },
        { 
            id: 1,
            _id: 0
         }
    )
        .sort({ createdAt: -1 })
        .lean();
     
    return lastFaculty?.id;
};

export const generateAdminId = async () => {
    let currentId = "0000";

    const lastAdminId = await findLastAdminId();

   

    if (lastAdminId) {
         currentId = lastAdminId.split("-")[2];
       
    }

    const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    const finalId = `ADM-${new Date().getFullYear()}-${incrementId}`;

    return finalId;
};



   // -----------------------------------------

  
