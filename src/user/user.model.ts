
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../app/config";

const userSchema= new Schema<TUser>({
    id:{type:String,required:true},
    password:{type:String,required:true},
    needChangePassword:{type:Boolean,default:true},
    role:{type:String, enum:['admin','faculty','student'],required:true},
    status:{type:String, enum:['in-progress','blocked'],Default:'in-progress' },
    isDeleted:{type:Boolean,default:false}
},
{
    timestamps:true
})

userSchema.pre('save',async function (next){
    
     this.password=await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
     )
    next()
})

userSchema.post('save',async function (doc,next){
    doc.password=''
    next()
})

 export const User =model('user',userSchema)
 
 