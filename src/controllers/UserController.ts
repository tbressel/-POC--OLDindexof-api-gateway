/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Express importation
import { Request } from "express";

// Service importation
import UserService from "../core/services/UserService";

// Utils importation
import MessagesUtil from "../utils/MessagesUtil";

// Models importation
import { MessageModel } from "../core/models/NotificationModel";

// Config importation
import { color } from "../config";
import validator from "validator";



//////////////////////////////////
////////   COMPONENT   ///////////
//////////////////////////////////
class UserController extends MessagesUtil {
    private userService: UserService;

    constructor(userService: UserService) {
        super();
        this.userService = userService;
    }


   
    public async checkEmail(req: Request, res: any): Promise<void> {
        console.log(color.bgGreen + color.green, `USER CONTROLLER`, ' -> checkEmail() called');

        try {
            const response: MessageModel | undefined = await this.userService.checkEmail(req);
            if (!response) return this.sendErrorResponse(res, 500, `user-api-empty-response`);
            return response.state ? res.status(response.code).json(response) : res.status(response.code).json(response);
        } catch (error) {
            return this.sendErrorResponse(res, 503, `user-api-failure`);
        }
    }



    public async isUsernameExists(req: Request, res: any): Promise<void> {
        console.log(color.bgGreen + color.green, `USER CONTROLLER`, ' -> isUsernameExists() called');

        try {
            const response: MessageModel | undefined = await this.userService.isUsernameExists(req);
            if (!response) return this.sendErrorResponse(res, 500, `user-api-empty-response`);
            return response.state ? res.status(response.code).json(response) : res.status(response.code).json(response);
        } catch (error) {
            return this.sendErrorResponse(res, 503, `user-api-failure`);
        }
    }



    public async session(req: Request, res: any): Promise<void> {
        console.log(color.bgGreen + color.green, `USER CONTROLLER`, ' -> session() called with params : ', req.query.action);

        let action: string = req.query.action as string;
        if (!action) return this.sendErrorResponse(res, 400, `user-api-missing-action`);

        // Cleaning the action string to prevent XSS attacks
        action = validator.escape(action);      

        // Transform the action string to a key of the UserService
        const methode: keyof UserService = action as keyof UserService;
      
        try {
            const response: MessageModel | undefined = await this.userService[methode](req);
            if (!response) return this.sendErrorResponse(res, 500, `user-api-empty-response`);
            return response.state ? res.status(response.code).json(response) : res.status(response.code).json(response);
        } catch (error) {
            return this.sendErrorResponse(res, 503, `user-api-failure`);
        }
    }
}

export default UserController;