import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../app/config';

const userSchema = new Schema<TUser,UserModel>(
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    needChangePassword: { type: Boolean, default: true },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
      required: true,
    },
    status: { type: String,
  enum: ['in-progress', 'blocked'],
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
  return await User.findOne({id}); 
}
userSchema.statics.isPasswordMatched=async function(plainTextPassword:string,hashPassword:string){
  return await bcrypt.compare(plainTextPassword,hashPassword)
}

export const User = model<TUser,UserModel>('User', userSchema);
