/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

// Express importation
import { Request } from "express";

// Service importation
import InterfaceService from "../core/services/InterfaceService";

// Utils importation
import MessagesUtil from "../utils/MessagesUtil";

// Models importation
import { MessageModel } from "../core/models/NotificationModel";

// Config importation
import { color, Uri } from "../config";




//////////////////////////////////
////////   COMPONENT   ///////////
//////////////////////////////////
class InterfaceController extends MessagesUtil {

  private interfaceService: InterfaceService;

  constructor(interfaceService: InterfaceService) {
    super();
    this.interfaceService = interfaceService;
  }


  public async getHome(req: Request, res: any): Promise<void> {
    console.log(color.bgGreen + color.green, 'INTERFACE CONTROLLER', ' -> getHome() called');

    try {
      const response: MessageModel | undefined = await this.interfaceService.getHome(req);

      if (!response) return this.sendErrorResponse(res, 500, "interface-service-bad-response");
      return response.state ? res.status(response.code).json(response) : res.status(response.code).json(response);
    }
    catch (error) {
      return this.sendErrorResponse(res, 503, "interface-api-failure");
    }
  }
}

export default InterfaceController;