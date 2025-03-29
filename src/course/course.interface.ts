import { Types } from "mongoose"

export type TPreRequisiteCoures={
    course:Types.ObjectId,
    isDelete:boolean
}

export type TCourse={
    title:string,
    prefix:string,
    code:number,
    credits:number,
    isDelete:boolean,
    preRequisiteCourse:[TPreRequisiteCoures]
    createdAt:Date,
    updatedAt:Date
}

