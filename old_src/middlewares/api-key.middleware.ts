import { Request, Response, NextFunction } from "express";
import ApiKeyController from "../controllers/api-key.controller";

class ApiKeyMiddleware {


 /**
   * Middleware to retrieve the user's API key from the database.
   * 
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next() function to pass control to the next middleware.
   */
  static getKey(req: Request, res: Response, next: NextFunction): void {
    ApiKeyController.getKey(req, res, next);
  }

  /**
   * Middleware to store the user's API key in Redis.
   * 
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next() function to pass control to the next middleware.
   */
  static storeKey(req: Request, res: Response, next: NextFunction): void {
    ApiKeyController.storeKey(req, res, next);
  }

   /**
   * 
   * @param req 
   * @param res 
   * @param next 
   */
   static checkKey(req: Request, res: Response, next: NextFunction): void {
    ApiKeyController.checkKey(req, res, next);
  }

}

export default ApiKeyMiddleware;