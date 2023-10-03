import { Request, Response } from "express";
import { createSession, findSessions } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJwt } from "../utils/jwt";
import config from "config";

const accessTokenTtl = config.get<string>("accessTokenTtl");
const refreshTokenTtl = config.get<string>("refreshTokenTtl");

export async function createSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);
  if (!user) {
    return res.send(401).send("Invalid email or password.");
  }

  // create a session

  const session = await createSession(user._id, req.get("user-agent") || "");

  // create an access token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: accessTokenTtl }
  );

  // create a refresh token
  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: refreshTokenTtl }
  );

  // return access & refresh token
  console.log({accessToken}, {refreshToken})

  return res.send({accessToken, refreshToken})
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user;
  const sessions = await findSessions({user: userId, valid:true})
  return res.send(sessions)
  
}
