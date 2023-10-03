import {Express, Request, Response} from 'express'
import validateResource from './middleware/validateResource';
import { createUserSchema } from './schemas/user.schema';
import { createUserHandler } from './controllers/user.controller';
import { createSessionSchema } from './schemas/session.schema';
import { createSessionHandler, getUserSessionsHandler } from './controllers/session.controller';
import { requireUser } from './middleware/requireUser';


function routes(app:Express){
  app.get('/healthcheck', (req: Request,res :Response)=>{
    return res.sendStatus(200)
  })


  app.post('/api/users', validateResource(createUserSchema) , createUserHandler)
  app.post('/api/sessions', validateResource(createSessionSchema) , createSessionHandler)
  app.get("/api/sessions", requireUser,getUserSessionsHandler)



}

export default routes;