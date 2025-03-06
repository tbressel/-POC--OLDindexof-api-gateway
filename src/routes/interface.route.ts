/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Exrpess importation
import express from "express";

// Controller importation
import InterfaceController from "../controllers/InterfaceController"
import InterfaceService from "../core/services/InterfaceService";

// middlewares import
import BodyParserMiddleware from "../middlewares/BodyParserMiddleware";
import CsrfMiddleware from "../middlewares/CsrfMiddleware";
// import ApiKeyMiddleware from "../../old_src/middlewares/api-key.middleware";


////////////////////////////////////////
////////   DEFINITION USES   ///////////
////////////////////////////////////////
const router = express.Router();
const csrfMiddleware = new CsrfMiddleware();
const interfaceService = new InterfaceService();
const interfaceController = new InterfaceController(interfaceService);

// Apply these middlewares to all routes
router.use(BodyParserMiddleware.urlEncodedParser);
router.use(BodyParserMiddleware.jsonParser);

// Frontoffice
router.post('/interface/home', (req, res) => interfaceController.getHome(req, res));

// router.get('/interface/index', authToken, indexController);

export default router;