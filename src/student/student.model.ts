import { model, Schema } from 'mongoose';

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
    ref: 'user',
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
  profileImage: { type: String },
  admissionSemester:{type:Schema.Types.ObjectId,
                       ref:'academicSemester'},
  academicDepartment: { type: Schema.Types.ObjectId,require:true,
                       ref:'academicDepartment'},
  isDeleted:{type:Boolean}                     
});

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


export const Student = model('students', studentSchema);
