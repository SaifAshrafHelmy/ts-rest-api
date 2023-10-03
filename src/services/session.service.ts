import { FilterQuery, Types } from 'mongoose';
import Session from "../models/session.model";

export async function createSession(userId: Types.ObjectId, userAgent: string){
  const session = await Session.create({user: userId, userAgent})
  return session;
}


export async function findSessions(query: FilterQuery<Session>) {
  return Session.find(query).lean()
  
}