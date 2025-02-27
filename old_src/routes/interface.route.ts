/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Exrpess importation
import express from "express";

// Controller importation
import InterfaceController from "../controllers/interface.controller";

// middlewares import
import BodyParserMiddleware from "../middlewares/body-parser.middleware";
import CsrfMiddleware from "../middlewares/csrf.middleware";
import ApiKeyMiddleware from "../middlewares/api-key.middleware";


////////////////////////////////////////
////////   DEFINITION USES   ///////////
////////////////////////////////////////
const router = express.Router();
const csrfMiddleware = new CsrfMiddleware();

// Apply these middlewares to all routes
router.use(BodyParserMiddleware.urlEncodedParser);
router.use(BodyParserMiddleware.jsonParser);

// Frontoffice
router.get('/interface/home', (req, res) => InterfaceController.getHome(req, res));

// router.get('/interface/index', authToken, indexController);

export default router;