import { model, Schema } from 'mongoose';
import { TStudent } from './student.interface';

const nameSchema = new Schema({
  firstName: { type: String },
  middleName: { type: String },
  lastName: { type: String },
});

const guardianSchema = new Schema({
  name: { type: String },
  relationWithStudent: { type: String },
  ocupation: { type: String },
  contactNo: { type: String },
});

const localGuardianSchema = new Schema({
  name: { type: String },
  relationWithStudent: { type: String },
  ocupation: { type: String },
  contactNo: { type: String },
});

const studentSchema = new Schema({
  id:{type:String},
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user is required'],
    ref: 'User',
  },
  name: { type: nameSchema },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  dateOfBirth: { type: String },
  email: { type: String },
  contactNo: { type: String },
  emergencyContactNo: { type: String },
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: { type: guardianSchema },
  localGuardian: { type: localGuardianSchema },
  profileImage: { type: String ,default:''},
  admissionSemester:{type:Schema.Types.ObjectId,
                       ref:'AcademicSemester'},
  academicDepartment: { type: Schema.Types.ObjectId,require:true,
                       ref:'AcademicDepartment'},
  academicFaculty : { type: Schema.Types.ObjectId,require:true,
                       ref:'AcademicFaculty'},                
  isDeleted:{type:Boolean}                     
},
{
  toJSON: {
    virtuals: true,
  },
});

//virtual 

studentSchema.virtual('fullName' ).get(function(){
  return (this?.name?.firstName|| '') + (  this?.name?.middleName || '' )+( this?.name?.lastName || '')
}) 


// query middleware
studentSchema.pre('find',function(next){
  this.find({isDeleted:{$ne:true}})
  next()
})


studentSchema.pre('findOne',function(next){
  this.find({isDeleted:{$ne:true}})
  next()
})

studentSchema.pre('aggregate',function(next){
  this.pipeline().unshift({$match:{$isDeleted:{$ne:true}}})
  next()
})


export const Student = model<TStudent>('Students', studentSchema);
