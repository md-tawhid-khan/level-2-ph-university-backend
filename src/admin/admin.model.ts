import { model, Schema } from "mongoose";
import { TAdmin } from "./admin.interface";
const nameSchema = new Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
});

const adminSchema=new Schema<TAdmin>(
    {
  id:{
    type:String,
    required:true
  },
user:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'User'
},
name:{
     type: nameSchema 
},
  designation:{
    type:String,
 required:true
},
  gender:{
    type:String,
required:true
},
  dateOfBirth:{
    type:String,
required:true
},
  email:{
    type:String,
required:true
},
  contactNo:{
    type:String,
required:true
},
  emergencyContactNo:{
    type:String,
required:true
},
  presentAddress:{
    type:String,
required:true
},
  permanentAddress:{
    type:String,
required:true
},
  profileImage:{
    type:String,
    default:''  
},
  
  managementDepartment:{
    type:Schema.Types.ObjectId,
required:true,
ref:'AcademicDepartment'
}, 
  isDelete:{
    type:Boolean,
required:true
 }   
},
{
  toJSON:{
    virtuals:true
  }
})

adminSchema.virtual('fullName' ).get(function(){
  return (this?.name?.firstName|| '') + (  this?.name?.middleName || '' )+( this?.name?.lastName || '')
}) 


// query middleware
adminSchema.pre('find',function(next){
  this.find({isDeleted:{$ne:true}})
  next()
})


adminSchema.pre('findOne',function(next){
  this.find({isDeleted:{$ne:true}})
  next()
})

adminSchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match:{$isDeleted:{$ne:true}}})
  next()
})

export const Admin=model<TAdmin>('Admin',adminSchema)