/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////
// Express importation
import express, { Express, Request, Response, NextFunction } from "express";

// importation of notifications messages
import { notificationMessages } from "../config/notifications-config";
import { getJsonResponse } from "../functions/notifications";

// import models
import { BoxModelResponse } from "../models/box.models";
import { ItemModelResponse } from "models/user-nav.models";

// import config
import { Uri, color } from '../config';


// express definition
const api: Express = express();

// BODY PARSER (Middleware to check data body from http request & configuration)
import { urlEncodedParserMiddleware, jsonParserMiddleware } from "../middlewares/body-parser";
api.use(urlEncodedParserMiddleware);
api.use(jsonParserMiddleware);

// Validator library importation to check and clean datas from request
import validator from 'validator';

///////////////////////////////////
////////   API ROUTES   ///////////
//////////////////////////////////

api.get('/interface/:pageName', async (req: Request, res: any, next: NextFunction) => {
  let { pageName } = req.params;
  console.log(color.bgCyan, 'ROUTE -> interface');
  console.log(color.cyan + color.white + color.red, 'GATEWAY ->', ' Valeur de pageName : ', pageName);

  // Cleaning the data to prevent XSS attacks
  pageName = validator.escape(pageName);


  // Check if the pageName is defined
  if (!pageName) {
    getJsonResponse(res, 400, "no-page-name", notificationMessages, false);
    return;


    ////// ROUTE FOR HOME PAGE  //////
  } else if (pageName === 'home') {
    try {
      const response = await fetch(`${Uri.apiInterface}/interface/v1/${pageName}?element=box`);
      const data: BoxModelResponse = await response.json();
      res.status(200).json(data);

    } catch (error) {
      getJsonResponse(res, 500, "fetch-fail", notificationMessages, false);
      return;
    }

    ////// ROUTE FOR INDEX PAGE  //////
  } else if (pageName === 'index') {
    try {
      const response = await fetch(`${Uri.apiInterface}/interface/v1/${pageName}?element=user_nav`);
      const data: ItemModelResponse = await response.json();
      res.status(200).json(data);

    } catch (error) {
      getJsonResponse(res, 500, "fetch-fail", notificationMessages, false);
      return;
    }
  }
});


export default api;
