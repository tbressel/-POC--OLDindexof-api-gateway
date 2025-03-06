/**
 * The main server file for the React_Node application.
 * @module index
 **/

/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Express importation
import express, { Express } from "express";
import path from 'path';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

// ConfigServer importation
import ServerModule from './src/modules/ServerModule';

// interface app components routes
// import contentRoutes from './routes/content.route';
import userRoutes from './src/routes/user.route';
import interfaceRoutes from './src/routes/interface.route';

// Middleware importation
import CorsMiddleware from "./src/middlewares/CorsMiddleware";
import DdosLimiterMiddleware  from "./src/middlewares/DdosLimiterMiddleware";

// Color importation
import { color } from './src/config';

const server: Express = express();


////////////////////////////////////////
////////   DEFINITION USES   ///////////
////////////////////////////////////////

server.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true }
}));

// get port server number from ServerConfig
server.listen(ServerModule.getApiListenPort(), () => {
  console.warn(color.green, "Server listened on port number ", ServerModule.getApiListenPort());
  console.warn(color.bgGreen, `API NAME -> ${ServerModule.getName()} - API VERSION -> ${ServerModule.getVersion()}`);
});


// CORS
const cors = require("cors");
server.use(cors(CorsMiddleware.getCorsConfig()));

// against DOS attacks and configuration
server.use(DdosLimiterMiddleware.requestCounterMiddleware);

// get request and speed limiter configuration
const requestLimiterConfig = DdosLimiterMiddleware.getRequestLimiterConfig();
const speedLimiterConfig = DdosLimiterMiddleware.getSpeedLimiterConfig();
console.log(color.green, `[Limite de requêtes] `+ color.reset + `${requestLimiterConfig.max} toutes les ${requestLimiterConfig.windowMs} ms`);

// apply request and speed limiter
const limiter = rateLimit(requestLimiterConfig);
server.use(limiter);

const speedLimiter = slowDown(speedLimiterConfig);
server.use(speedLimiter);



////////////////////////////////////
///////    STATIC ROUTES   /////////
////////////////////////////////////
server.use('/public/uploads/avatars', express.static(path.join(__dirname, 'uploads/avatars')));


server.use('', userRoutes);
server.use('', interfaceRoutes);
// server.use('', contentRoutes);