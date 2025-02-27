import { Request, Response } from "express";
import { handleHomeService } from "../services/homeService";

export const homeController = async (req: Request, res: Response) => {
  let token = req.headers.authorization as string | undefined | null;

  if (token) {
    const parts = token.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }

  console.log('ROUTE -> interface/home');
  console.log('GATEWAY ->', ' Valeur de token (ou pas) : ', token);

  try {
    const homePageRequest = await handleHomeService(res, token ?? null);
    res.status(200).json(homePageRequest);
  } catch (error) {
    console.error('Error in homeController:', error);
  }
};