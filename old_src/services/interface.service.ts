import validator from 'validator';
import { Uri } from "../../src/config";
import { Response } from "express";
import MessagesUtil from "../utils/response.util";
import { color } from "../../src/config";

class InterfaceService extends MessagesUtil {


  constructor() {
    super();
    this.sendErrorResponse = this.sendErrorResponse.bind(this);
  }



/**
 * 
 * @param pageName 
 * @param element 
 * @returns 
 */
  async getHome(pageName: string, element: string): Promise<any> {
    console.log(color.bgGreen, 'CONTROLLER -> InterfaceService - getInterfaceData');

    if (!pageName || !element) {
      throw new Error("missing-data");
    }

    pageName = validator.escape(pageName);
    element = validator.escape(element);

    const response = await InterfaceRepository.getInterfaceData(element);
    if (!response) {
      throw new Error("no-page-name");
    }
    return response;
  }
}

export default new InterfaceService();