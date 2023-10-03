import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../services/user.service";
import { CreateUserInput } from "../schemas/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);

    return res.json({
      name: user.name,
      email: user.email,
    });
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
