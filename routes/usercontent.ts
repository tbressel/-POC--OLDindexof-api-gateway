/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////
// Express importation
import express, { Express, Request, Response, NextFunction } from "express";

// express definition
const api: Express = express();
// import config
import { Uri, color } from '../config'; 

// importation of notifications messages
import { notificationMessages } from "../config/notifications-config";
import { getJsonResponse } from "../functions/notifications";

// BODY PARSER (Middleware to check data body from http request & configuration)
import { urlEncodedParserMiddleware, jsonParserMiddleware } from "../middlewares/body-parser";
api.use(urlEncodedParserMiddleware);
api.use(jsonParserMiddleware);

// Validator library importation to check and clean datas from request
import validator from 'validator';



////////////////////////////////////////
////////   DEFINITION USES   ///////////
////////////////////////////////////////

/**
 * Route to get the content of a page Home
 */
api.get('/content/:pageName/', async (req: Request, res: Response, next: NextFunction) => {
  let { pageName, id } = req.params as { pageName: string, id: string };
  console.log(color.green, 'ROUTE -> usercontent');
  console.log(color.bgGreen, 'GATEWAY -> Valeur de pageName : ', pageName);

 // Cleaning the data to prevent XSS attacks
 pageName = validator.escape(pageName);

   // Check if the pageName is defined
   if (!pageName) {
    getJsonResponse(res, 400, "no-page-name", notificationMessages, false);
    return;

    ////// ROUTE FOR HOME PAGE  //////
   } else if (pageName === 'home') {
    
     try {
       const response = await fetch(`${Uri.apiContent}/content/v1/${pageName}?element=carousel&public=true&display=true`);
       const data: any = await response.json();
       res.json(data);
      } catch (error) {
        getJsonResponse(res, 500, "fetch-fail", notificationMessages, false);
      }
    }
    });
    


/**
 * Route to get the content of a page Index
 */
api.get('/content/:pageName/:id', async (req: Request, res: Response, next: NextFunction) => {
  let { pageName, id } = req.params as { pageName: string, id: string };

  console.log(color.green, 'ROUTE -> usercontent');
  console.log(color.bgGreen, 'GATEWAY -> Valeur de pageName : ', pageName);
  console.log(color.bgGreen, 'GATEWAY -> Valeur de id : ', id);

 // Cleaning the data to prevent XSS attacks
 pageName = validator.escape(pageName);
 id = validator.escape(id);
 let idInt = parseInt(id);


   // Check if the pageName is defined
   if (!pageName || !idInt) {
    getJsonResponse(res, 400, "parameter-missing", notificationMessages, false);
    return;

    ////// ROUTE FOR INDEX PAGE  //////
   } else if (pageName === 'index') {
    
     try {
       const response = await fetch(`${Uri.apiContent}/content/v1/${pageName}/${id}`);
       const data: any = await response.json();
       res.json(data);
      } catch (error) {
        getJsonResponse(res, 500, "fetch-fail", notificationMessages, false);
      }
    }
    });
    

export default api;
