import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
import logger from "../utils/logger";


export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers?.authorization?.replace("/^Bearer\s/", "")
  logger.info({accessToken})
  
  if(!accessToken){
    return next()
  }
  const {decoded, expired }= verifyJwt(accessToken)
  console.log({decoded})
  if(decoded){
    res.locals.user = decoded;
  }
  else{
    logger.error("not decoded")
  }
   
  return next()
};
