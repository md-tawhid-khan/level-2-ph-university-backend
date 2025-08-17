
import { TFaculty } from './faculty.interface';
import mongoose, { model, Schema, } from "mongoose";

const nameSchema = new Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
});

const facultySchema=new mongoose.Schema<TFaculty>(
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
required:true
},
  academicFaculty:{
    type:Schema.Types.ObjectId,
required:true,
ref:'AcademicFaculty'
},
  academicDepartment:{
    type:Schema.Types.ObjectId,
required:true,
ref:'AcademicDepartment'
}, 
  isDelete:{
    type:Boolean,
required:true
 }   
})

facultySchema.virtual('fullName' ).get(function(){
  return (this?.name?.firstName|| '') + (  this?.name?.middleName || '' )+( this?.name?.lastName || '')
}) 


// query middleware
facultySchema.pre('find',function(next){
  this.find({isDeleted:{$ne:true}})
  next()
})


facultySchema.pre('findOne',function(next){
  this.find({isDeleted:{$ne:true}})
  next()
})

facultySchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match:{$isDeleted:{$ne:true}}})
  next()
})

export const Faculty=model<TFaculty>('Faculty',facultySchema)