import { Request, Response, NextFunction } from "express";

export const  requireUser = (req:Request, res:Response, next: NextFunction)=>{
  const user = res.locals.user;
  console.log(res.locals)

  if(!user){
    return res.sendStatus(403)
  }
  next()


}