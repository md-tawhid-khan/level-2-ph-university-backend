import { model, Schema } from "mongoose"

 const nameSchema =new Schema({
    firstName:{type:String},
    middleName:{type:String},
    lastName:{type:String}
})

const guardianSchema= new Schema({
    name:{type:String},
    relationWithStudent:{type:String},
    ocupation:{type:String},
    contactNo:{type:String},
})

const localGuardianSchema= new Schema({
    name:{type:String},
    relationWithStudent:{type:String},
    ocupation:{type:String},
    contactNo:{type:String},
})

const studentSchema= new Schema({
      id:{type:String,required:[true,'id is required'],unique:true}, 
      user:{type:Schema.Types.ObjectId,required:[true,'user is required'],ref:'User'}, 
       name:{type:nameSchema},
       gender:{type:String,enum:['male','female','other']},
       dateOfBirth:{type:String},
       email:{type:String},
       contactNo:{type:String},
       emergencyContactNo:{type:String},
       presentAddress:{type:String},
       permanentAddress:{type:String},
       guardian:{type:guardianSchema},
       localGuardian:{type:localGuardianSchema},
       profileImage:{type:String},     
       academicDepartment:{type:String},
       isDeleted:{type:Boolean}
      
})

export  const Student= model('students',studentSchema)