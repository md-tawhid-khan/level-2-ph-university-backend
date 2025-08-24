import { Types } from "mongoose"


export type TGrade='A'|'B'|'C'|'D'|'F'|'NA'

export type  TCourseMark={
    classTest1:number,
    midTerm:number,
    classTest2:number,
    finalTest:number
}

export type TEnrolledCourse={
 offeredCourse:Types.ObjectId,
 semesterRegistration:Types.ObjectId,
 academicSemester:Types.ObjectId,
 academicFaculty:Types.ObjectId,
 academicDepartment:Types.ObjectId,
 course:Types.ObjectId,
 faculty:Types.ObjectId,
 student:Types.ObjectId,
 isEnrolled:boolean,
 courseMarks:TCourseMark,
 grade:TGrade,
 gradePoints:number,
 isComplete:boolean,

}