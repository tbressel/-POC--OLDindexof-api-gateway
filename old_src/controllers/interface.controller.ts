import { Request, Response } from "express";
import { InterfaceService } from "../services/interface.service";
import { color } from "../../src/config";
import MessagesUtil from "../utils/response.util";




class InterfaceController extends MessagesUtil {

  private serviceInterface: InterfaceService;

  constructor() {
    super();
    this.getHome = this.getHome.bind(this);
    this.sendErrorResponse = this.sendErrorResponse.bind(this);
    this.serviceInterface = new InterfaceService();
  }


  public async getHome(req: Request, res: Response): Promise<any> {
    console.log(color.bgGreen, 'CONTROLLER -> InterfaceController - getHome');

    const token: string = req.headers.authorization;
    const urlInterface: string = `${Uri.apiContent}/content/v1/interface/`;

    let { slug } = req.params;
    let action: string = req.query.action as string || '';
    let memoId: string = req.query.memoId as string || '';

    try {
      const response = await this.serviceInterface.getHome(res, slug, action, memoId);

      if (!response) {
        console.error(color.red, "Response not ok in NavigationController - getInterface");
        return this.sendErrorResponse(res, 500, "user-service-bad-response");
      }
      return res.status(200).json(response);
    }
    catch (error) {
      console.error(color.red, "Error in NavigationController - getInterface: ", error);
      return this.sendErrorResponse(res, 503, "user-service-failure");
    }


  }

}




export default new InterfaceController();