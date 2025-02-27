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



//////////////////////////////////
////////   COMPONENT   ///////////
//////////////////////////////////
class UserController extends MessagesUtil {
    private userService: UserService;

    constructor(userService: UserService) {
        super();
        this.userService = userService;
    }


    /**
     * Checks if the provided email exists in the database.
     * 
     * This method is called when a request is made to check the existence of an email.
     * It validates the email format and then calls the UserService to perform the actual check.
     * If the email is missing or invalid, it sends an appropriate error response.
     * 
     * @param req - The request object containing the email in the body.
     * @param res - The response object used to send back the desired HTTP response.
     * @returns A promise that resolves to the response sent back to the client.
     */
    public async checkEmail(req: Request, res: any): Promise<void> {
        console.log(color.bgGreen + color.green, `USER CONTROLLER`, ' -> checkEmail() called');

        try {
            const response: MessageModel | undefined = await this.userService.checkEmail(req);
            if (!response) return this.sendErrorResponse(res, 500, `user-api-empty-response`);
            return response.state ? res.status(response.code).json(response) : res.status(response.code).json(response);
        } catch (error: any) {
            return this.sendErrorResponse(res, 503, `user-api-failure`);
        }
    }
}

export default UserController;