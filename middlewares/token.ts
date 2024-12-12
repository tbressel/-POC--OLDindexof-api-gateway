/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// CsrfToken importation
import { CsrfToken, CsrfTokenType } from "../classes/CsrfToken";

// Library importation
import jwt from "jsonwebtoken";

// importation of notifications messages
import { notificationMessages } from "../config/notifications-config";
import { getJsonResponse } from "../functions/notifications";

// Express importation
import { Express, Request, Response, NextFunction } from "express";

/**
 *
 * function to verify the token for certain routes
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export function authToken(req: any, res: Response, next: NextFunction) {
  //  Get the token from the header juste after authorization keyword
  const header: string | undefined = req.headers["authorization"];

  // Split Bearer from the token value and keep just the token
  const token: string | undefined = header && header.split(" ")[1];

  // Test if the token is missing or null of undefined
  if (!token || token === undefined || token === null || token === "null") {
    res.status(500).json({ message: "Erreur il manque le token" });
    return;
  }

  // Get the secret key from the CsrfToken class
  const csrfTokenKeys: CsrfTokenType = CsrfToken.getCsrfTokenKeys();
  const secretKey: string | undefined = csrfTokenKeys.secretKey;

  // Test if the secret key is missing or null of undefined
  if (!secretKey || secretKey === null || secretKey === undefined) {
    res.status(500).json({ message: "Erreur il manque la clé secrète" });
    return;
  }

  // Verify the token with the secret key
  jwt.verify(token, secretKey, (error: Error | null, results: any) => {
    // if it's a wrond token then return an error
    if (error) {
      getJsonResponse(res, 500, "session-over", notificationMessages, false);
      return;
    }

    // Add the results to the request object
    req.results = results;

    // go to the next middleware
    next();
  });
}

/**
 * 
 * Function to check if the token is present
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export function isToken(req: Request, res: Response, next: NextFunction) {
  //  Get the token from the header
  console.log("Je suis dans le isToken");
  const header: string | undefined = req.headers["authorization"];

  // Test if the token is missing or null of undefined
  if (header === undefined || header === null || header === "null") {
    console.log("Je suis dans le if de isToken");
    next('route');
  } else {
    // go to the next middleware
    next();
  }
}
