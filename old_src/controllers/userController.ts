import { Request, Response } from "express";
import { handleUserService } from "../services/userService";

export const checkEmailExists = async (req: Request, res: Response) => {
  let { slug } = req.params;
  let action: string = req.query.action as string || '';
  const email: string = req.headers["email"] as string;
  const username: string = req.headers["username"] as string;
  const passwordClient: string = req.headers["password"] as string;
  const authorization: string = req.headers["authorization"] as string;

  await handleUserService(res, slug, action, email, passwordClient, username, authorization);
};

export const postAvatarFile = async (req: Request, res: Response) => {
  let { slug } = req.params;
  let action: string = req.query.action as string || '';
  const email: string = req.headers["email"] as string;
  const username: string = req.headers["username"] as string;
  const passwordClient: string = req.headers["password"] as string;
  const authorization: string = req.headers["authorization"] as string;

  await handleUserService(res, slug, action, email, passwordClient, username, authorization);
};