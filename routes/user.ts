


/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////
// Express importation
import express, { Express, Request, Response, NextFunction } from "express";

// ConfigServer importation
import { authToken } from "../middlewares/token"; // Middleware to check token
import { getKey } from "../middlewares/get-key"; // Middleware to get the API key (and id_user)
import { storeKey } from "../middlewares/store-key"; // Middleware to store the API key into cache (and id_user)


////////////////////////////////////////
////////   DEFINITION USES   ///////////
////////////////////////////////////////

// express definition
const api: Express = express();

/**
 * Route to get all users from database users
 */
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
    const response = await fetch("http://localhost:5002/user/v1/get-users", {
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
      data: data});

  } catch (error: any) {
    console.error("Error in /user route:", error);

    res.status(error.response?.status || 500).json({
      message: "Erreur de communication avec le microservice User",
      details: error.message,
    });
  }
});


export default api;