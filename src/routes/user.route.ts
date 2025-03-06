/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Exrpess importation
import express from "express";

// Controller importation
import UserController from "../controllers/UserController"
import UserService from "../core/services/UserService";

// middlewares import
import BodyParserMiddleware from "../middlewares/BodyParserMiddleware";
import CsrfMiddleware from "../middlewares/CsrfMiddleware";
// import ApiKeyMiddleware from "../../old_src/middlewares/api-key.middleware";

////////////////////////////////////////
////////   DEFINITION USES   ///////////
////////////////////////////////////////
const router = express.Router();
const csrfMiddleware = new CsrfMiddleware();
const userService = new UserService();
const userController = new UserController(userService);

// Apply these middlewares to all routes
router.use(BodyParserMiddleware.urlEncodedParser);
router.use(BodyParserMiddleware.jsonParser);


router.post("/user/email", (req, res) => userController.checkEmail(req, res));
router.post("/user/username", (req, res) => userController.isUsernameExists(req, res));

// action : login, create
router.post("/user/session", (req, res) => userController.session(req, res));

// action : check
router.get("/user/session", (req, res) => userController.session(req, res));

export default router;