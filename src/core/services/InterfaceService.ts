/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Utils importation
import MessagesUtil from "../../utils/MessagesUtil";
import { Request } from 'express';

// Config importation
import { color, Uri } from "../../config";
import { MessageModel } from "../../core/models/NotificationModel";
// Library importation
import validator from "validator";

class InterfaceService extends MessagesUtil {


/**
 * 
 * @param pageName 
 * @param element 
 * @returns 
 */
  public async getHome(req: Request): Promise<MessageModel> {
    console.log(color.bgGreen + color.green, 'INTERFACE SERVICE', ' -> getHome() called');

    let element: string = req.query.element as string;
    console.log(element);
    if (!element) return this.returnErrorMessage(401, 'missing-data', false);
    element = validator.escape(element);
    req.body.element = element;

    try {
      const response = await fetch(`${Uri.apiInterface}interface/v1/home`, {
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


  //   const response = await InterfaceRepository.getInterfaceData(element);
  //   if (!response) {
  //     throw new Error("no-page-name");
  //   }
  //   return response;
  // }
}

export default InterfaceService;