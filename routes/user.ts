/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Express importation
import express, { Express, Request, Response } from "express";

// ConfigServer importation
import { authToken } from "../middlewares/token"; // Middleware to check token
import { getKey } from "../middlewares/get-key"; // Middleware to get the API key (and id_user)
import { storeKey } from "../middlewares/store-key"; // Middleware to store the API key into cache (and id_user)

import { Uri, color } from '../config'; // import config


import validator from 'validator';

import { getJsonResponse } from "../functions/notifications";
import { notificationMessages } from "../config/notifications-config";
import { contactApi } from "../functions/api";


// express definition
const api: Express = express();



// Jsonwebtoken to generate a token
const jwt = require('jsonwebtoken');



////////////////////////////////////////
////////   DEFINITION USES   ///////////
////////////////////////////////////////
api.get("/user", authToken, getKey, storeKey, async (req: Request, res: any) => {

  // Get the token from the request headers
  const token: string | undefined = req.headers["authorization"]?.split(" ")[1];

  // Test if the token is missing or null of undefined
  if (!token || token === undefined || token === null || token === 'null') {
    res.status(500).json({ message: 'Erreur il manque le token' });
    return;
  }

  try {
    // Call the user microservice to get all users
    const response = await fetch(`${Uri.apiContent}/user/v1/get-users`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    // Check if the response is not ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Response error text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response to json
    const data: Response = await response.json();

    // Send the response to the client
    res.status(200).json({
      message: 'Mes data reçues de la réponse',
      data: data
    });

  } catch (error: any) {
    console.error("Error in /user route:", error);

    res.status(error.response?.status || 500).json({
      message: "Erreur de communication avec le microservice User",
      details: error.message,
    });
  }
});


///////////////////////////////////////////////////////////////////////////
////////   CHECK IF AN EMAIL EXISTS DEPENDING ON THE STEP SLUG  ///////////
///////////////////////////////////////////////////////////////////////////
api.get("/user/:step", async (req: Request, res: Response) => {

  // Get the step slug from the request headers and clean it to prevent XSS attacks
  let { step } = req.params;
  step = validator.escape(step);
  console.log(color.green, 'ROUTE -> user');
  console.log(color.bgGreen + color.white + color.red, 'GATEWAY ->', ' Valeur de step : ', step);



  // Check if the step is defined
  if (!step) {
    getJsonResponse(res, 400, "no-page-name", notificationMessages, false);
    return;
  }



  /**
   * -------------- EMAIL SECTION --------------
   */

  // Check if the step has the value 'email'. Then store it.
  if (step === 'email') {
    const email: string = req.headers["email"] as string;
    console.log(color.bgGreen + color.white + color.red, 'GATEWAY ->', ' Valeur de email : ', email);
    await contactApi('user/v1/email/check', res, 'post', Uri.apiUser, email);
  }



  /**
   * -------------- NAME SECTION --------------
   */

  // Check if the step has the value 'email'. Then store it.
  if (step === 'name') {
    const username: string = req.headers["username"] as string;

    console.log(color.bgGreen + color.white + color.red, 'GATEWAY ->', ' Valeur de username : ', username);
    await contactApi('user/v1/username/check', res, 'post', Uri.apiUser, "", "", username);
  }





  /**
   * -------------- CREATE SECTION --------------
   */

  // Check if the step has the value 'email'. Then store it.
  if (step === 'create') {

    const username: string = req.headers["username"] as string;
    let email: string = req.headers["email"] as string;


    console.log(color.bgGreen + color.white + color.red, 'GATEWAY ->', ' Valeur de username : ', username);
    console.log(color.bgGreen + color.white + color.red, 'GATEWAY ->', ' Valeur de email : ', email);
    await contactApi('user/v1/signin', res, 'post', Uri.apiUser, email, "", username);
  }



  /**
   * -------------- AUTH SECTION --------------
  */

  // Check if the step has the value 'email'. Then store it.
  if (step === 'auth') {

    let email: string = req.headers["email"] as string;
    let passwordClient: string = req.headers["password"] as string;


    console.log(color.bgGreen + color.white + color.red, 'GATEWAY ->', ' Valeur de email : ', email);
    console.log(color.bgGreen + color.white + color.red, 'GATEWAY ->', ' Valeur de password : ', passwordClient);


    await contactApi('user/v1/login', res, 'post', Uri.apiUser, email, passwordClient);
  }


  /**
   * -------------- SESSION SECTION --------------
  */

  // Check if the step has the value 'email'. Then store it.
  if (step === 'session') {
    console.log(color.bgGreen + color.white + color.red, 'GATEWAY ->', ' Valeur de SESSION : ', req.headers);

    let authorization: string = req.headers["authorization"] as string;
    console.log(color.bgGreen + color.white + color.red, 'GATEWAY ->', ' Valeur de authorization : ', authorization);

    await contactApi('user/v1/token', res, 'post', Uri.apiUser, "", "", "", authorization);

  }
});





export default api;