import { model, Schema } from 'mongoose';
import { TCourse, TPreRequisiteCoures } from './course.interface';

const preRequisiteSchema=new Schema<TPreRequisiteCoures>({
    course:{type:Schema.Types.ObjectId,
        ref:'Course'
    },
    isDelete:{
        type:Boolean,
        default:false
    },
   
},
{
    _id:false
})

const courseSchema=new Schema<TCourse>({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    prefix:{
        type:String,
        required:true,
        trim:true,
    },
    code:{
        type:Number,
        required:true,
        trim:true,
    },
    credits:{
        type:Number,
        trim:true,
        required:true
    },
    isDelete:{
        type:Boolean,
        default:false
    },
    preRequisiteCourse:[preRequisiteSchema],
    
},
{
    timestamps:true
})

export const courseModel=model<TCourse>('Course',courseSchema)