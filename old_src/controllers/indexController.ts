import { Request, Response } from "express";
import { handleIndexService } from "../services/indexService";
import { authToken } from "../middlewares/token";

export const indexController = async (req: Request, res: Response) => {
  console.log('1')
  let token = req.headers.authorization as string | undefined | null;

  if (token) {
    console.log('2')
    const parts = token.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    }
  }
  console.log('3')
  console.log('ROUTE -> interface/index');
  console.log('GATEWAY ->', ' Valeur de token (ou pas) : ', token);

  try {
    console.log('4')
    const data = await handleIndexService(res, token ?? null);   
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in indexController:', error);
  }
};