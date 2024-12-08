/**
 * The main server file for the React_Node application.
 * @module index
 **/

/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Express importation
import express, { Express} from "express";

// User routes
import UserRoutes from "./routes/user"; 
import UserContentRoutes from "./routes/usercontent"; 
import InterfaceRoutes from "./routes/interface";

// ConfigServer importation
import ServerConfig from "./config/ServerConfig";

// Middleware importation
import CorsConfig from "./middlewares/CorsConfig"; // Middleware to configure CORS


////////////////////////////////////////
////////   DEFINITION USES   ///////////
////////////////////////////////////////

// express definition
const api: Express = express();

// get port server number from ServerConfig
const configPort: ServerConfig = ServerConfig.getApiListenPort();
const configName: ServerConfig = ServerConfig.getName();
const configVersion: ServerConfig = ServerConfig.getVersion();
api.listen(configPort, () => {
  console.warn("Server listened on port number ", configPort);
  console.warn(`API NAME -> ${configName} - API VERSION -> ${configVersion}`);
});

// CORS
const cors = require("cors");
const corsOptions = CorsConfig.getCorsConfig();
console.log("CORS OPTIONS : ", corsOptions);
api.use(cors(corsOptions));


api.use('', UserRoutes);
api.use('', UserContentRoutes);
api.use('', InterfaceRoutes);