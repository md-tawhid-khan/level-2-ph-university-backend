import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema= new Schema<TUser>({
    id:{type:String,required:true},
    password:{type:String,required:true},
    needChangePassword:{type:Boolean,},
    role:{type:String, enum:['admin','faculty','student'],required:true},
    status:{type:String, enum:['in-progress','blocked'],requirde:true},
    isDeleted:{type:Boolean,default:false}
},
{
    timestamps:true
})

 export const User =model('user',userSchema)
 
 