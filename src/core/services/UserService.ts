/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Utils importation
import MessagesUtil from "../../utils/MessagesUtil";
import { Request } from 'express';

// Config importation
import { color, Uri } from "../../config";
import { MessageModel } from "../../core/models/NotificationModel";


class UserService extends MessagesUtil {


    public async checkEmail(req: Request): Promise<MessageModel> {
        console.log(color.bgGreen + color.green, `USER SERVICE`, ' -> checkEmail() called');

        try {
            const response = await fetch(`${Uri.apiUser}user/v1/email/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body)
            });
            const data: MessageModel = await response.json();
            return response.ok ? data : this.returnErrorMessage(data.code, data.messageKey, false);

        } catch (error) {
            return this.returnErrorMessage(503, `user-api-failure`, false);
        }
    }
}

export default UserService;