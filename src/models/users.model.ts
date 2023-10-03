type User = InferSchemaType<typeof userSchema>;


import mongoose, { InferSchemaType, Model } from "mongoose";
import bcrypt from "bcrypt";
import config from "config";


export interface IUser{
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}


interface IUserMethods {
  comparePassword(candidatePassword:string): Promise<boolean>;
}


type UserModel = Model<IUser, {}, IUserMethods>;





const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);






userSchema.pre("save", async function(next: any){
  let user = this;
  if(!user.isModified('password')){
    return next()
  }
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))
  const hash = await bcrypt.hashSync(user.password, salt)
  user.password = hash;
  return next();

})

userSchema.methods.comparePassword = async function(candidatePassword: string):Promise<boolean>{
  let user = this;

  return bcrypt.compare(candidatePassword, user.password).catch(e => false)

}







const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;



