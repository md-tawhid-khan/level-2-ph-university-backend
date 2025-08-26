import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../app/config';
import { userStatus } from './user.constant';

const userSchema = new Schema<TUser,UserModel>(
  {
    id: {
       type: String,
       required: true,
       unique:true 
      },
    password: {
       type: String,
        required: true ,
        select:0
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
    needChangePassword: { type: Boolean, default: true },
    passwordChangeAt:{type:Date},
    role: {
      type: String,
      enum: ['super_admin','admin', 'faculty', 'student'],
      required: true,
    },
    status: { type: String,
  enum: userStatus,
  default: 'in-progress',
},

    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistByCustomId=async function(id:string){

  return await User.findOne({id}).select('+password'); 
}

userSchema.statics.isPasswordMatched=async function(plainTextPassword:string,hashPassword:string){
  return await bcrypt.compare(plainTextPassword,hashPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChange=async function(passwordChangeTimeStamp:Date,JWTIssusedTimeStamp:number){
  const passwordChangetime=new Date(passwordChangeTimeStamp).getTime()/1000 ;
 return passwordChangetime>JWTIssusedTimeStamp 
}

export const User = model<TUser,UserModel>('User', userSchema);
