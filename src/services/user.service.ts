import User from "../models/users.model";


type UserInputData = Omit<User, 'createdAt' | 'updatedAt' >

export async function createUser(userData: UserInputData ) {
  try {
    return await User.create(userData)
    
  } catch (error:any) {
    throw new Error(error)
    
  }
  
}


export async function validatePassword({email, password}:{email: string, password: string}) {
  const user = await User.findOne({email})  

  if(!user){
    return false;
  }

  const isValid = await user.comparePassword(password);
  if(!isValid) return false;

  return user;
  

  
}