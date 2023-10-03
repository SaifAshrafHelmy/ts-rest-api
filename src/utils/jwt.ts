import jwt from "jsonwebtoken";
import config from 'config'

const JWT_SECRET = config.get<string>("JWT_SECRET")

export function signJwt(object: Object,
  options? : jwt.SignOptions | undefined
  ) {
  return jwt.sign(object, JWT_SECRET, options && options);
}

export function verifyJwt(token: string) {
  try {
    const decoded =  jwt.verify(token, JWT_SECRET)
    return{
      valid:true,
      expired:false,
      decoded: decoded
    }
  } catch (error:any) {
    return{
      valid:false,
      expired: error.message=== 'jwt expired',
      decoded: null
    }
    
  }
}
