import { notificationMessages } from "../config/notifications-config";
import { getJsonResponse } from "../functions/notifications";
import { Response } from "express";

/**
 * 
 * Function to contact the API
 * @param route 
 * @param res 
 * @param method 
 * @param uri 
 * @param email 
 * @param password 
 * @returns 
 */
export async function contactApi(route: string, res: Response, method: string, uri: string, email?: string, password?: string) {

  method.toUpperCase();
  method = method || 'POST' || 'GET' || 'undefined';
  email = email || '';
  password = password || '';
  const header = headerBuilder(password, email);




  try {
    // Call the user API to check if the email exists
    const response = await fetch(`${uri + route}`, {
      method: method,
      headers: header
    });



    // Check if the response is OK or not
    if (!response.ok) {
      const messageKey = (response.headers.get('x-message-key') as string);
      getJsonResponse(res, 401, messageKey, notificationMessages, false);
      return;

    } else {
      const data: Response = await response.json();
      // Send the response to the client
      res.status(200).json({ data: data });
    }



  } catch (error: unknown) {
    console.error("Error in /user route from gateway API:", error);
    getJsonResponse(res, 500, 'fail2', notificationMessages, false);
    return;
  }
}



/**
 * 
 * @param password 
 * @param email 
 * @returns 
 */
function headerBuilder(password?: string, email?: string): { [key: string]: string } {
  if (!password || password === 'undefined' || password === null) {
    return {
      "Content-Type": "application/json",
      "email": email || ''
    };
  } else {
    return {
      "Content-Type": "application/json",
      "email": email || '',
      "password": password
    };
  }
}