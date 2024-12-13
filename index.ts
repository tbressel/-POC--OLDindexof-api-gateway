/**
 * The main server file for the React_Node application.
 * @module index
 **/

/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Express importation
import express, { Express} from "express";
const api: Express = express();


import session from 'express-session';

api.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true }
}));


// User routes
import UserRoutes from "./routes/user"; 
import UserContentRoutes from "./routes/usercontent"; 
import InterfaceRoutes from "./routes/interface";

// ConfigServer importation
import ServerConfig from "./classes/ServerConfig";

// Middleware importation
import CorsConfig from "./classes/CorsConfig"; // Middleware to configure CORS
import DdosLimiterConfig  from "./classes/LimiterConfig";

// Config color
import { color } from './config';


// against DOS attacks and configuration
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
const limiter = rateLimit(DdosLimiterConfig.getRequestLimiterConfig());
const speedLimiter = slowDown(DdosLimiterConfig.getSpeedLimiterConfig());
api.use(limiter);
api.use(speedLimiter);



// Compteur global pour suivre le nombre de requêtes
let requestCount = 0;
// Middleware personnalisé pour incrémenter et afficher le compteur
api.use((req, res, next) => {
  requestCount++;
  console.log(`Nombre de requêtes reçues : ${requestCount}`);
  next();
});

////////////////////////////////////////
////////   DEFINITION USES   ///////////
////////////////////////////////////////



// get port server number from ServerConfig
const configPort: ServerConfig = ServerConfig.getApiListenPort();
const configName: ServerConfig = ServerConfig.getName();
const configVersion: ServerConfig = ServerConfig.getVersion();
api.listen(configPort, () => {
  console.warn(color.green, "Server listened on port number ", configPort);
  console.warn(color.bgGreen, `API NAME -> ${configName} - API VERSION -> ${configVersion}`);
});

// CORS
const cors = require("cors");
const corsOptions = CorsConfig.getCorsConfig();
console.log("CORS OPTIONS : ", corsOptions);
api.use(cors(corsOptions));


api.use('', UserRoutes);
api.use('', UserContentRoutes);
api.use('', InterfaceRoutes);