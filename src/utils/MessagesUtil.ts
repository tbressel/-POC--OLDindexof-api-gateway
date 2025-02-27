import { Response } from "express";
import { NotificationMessages, MessageModel } from "../core/models/NotificationModel";
import { notificationMessages } from "../datas/messages.data";



class MessagesUtil {
 

  /**
   * Sends an error response with the specified status code and message key.
   * 
   * @param res - The response object used to send back the desired HTTP response.
   * @param statusCode - The HTTP status code to send.
   * @param messageKey - The key of the message to include in the response.
   */
  protected sendErrorResponse(res: Response, statusCode: number, messageKey: string): void {
    this.getErrorResponse(res, statusCode, messageKey, notificationMessages, false);
  }


  protected returnErrorMessage(statusCode: number, messageKey: keyof NotificationMessages, state: false): MessageModel {
    return this.getErrorMessage(statusCode, messageKey, notificationMessages, state);
  }

  
  protected returnSuccessData(statusCode: number, messageKey: keyof NotificationMessages, datas: any, state: true): MessageModel {
    return this.getSuccessData(statusCode, messageKey, notificationMessages, datas, state);
  }


  /**
   * Sends a JSON response with the specified status number, message key, and notification messages.
   * 
   * @param res - The response object used to send back the desired HTTP response.
   * @param statusNumber - The HTTP status number to send.
   * @param messageKey - The key of the message to include in the response.
   * @param notificationMessages - The notification messages to include in the response.
   * @param state - The state to include in the response (optional).
   */
  private getErrorResponse(res: Response, statusNumber: number, messageKey: keyof NotificationMessages,
    notificationMessages: NotificationMessages, state: false): void {

    res.status(statusNumber).json({
      messageKey: messageKey,
      message: notificationMessages[messageKey],
      state: state
    });
  }



private getSuccessData(statusNumber: number, messageKey: keyof NotificationMessages,
  notificationMessages: NotificationMessages, datas: any, state: true): MessageModel {

    return {
      code: statusNumber,
      messageKey: messageKey,
      message: notificationMessages[messageKey],
      state: state,
      datas: datas
    }
  };

  private getErrorMessage(statusNumber: number, messageKey: keyof NotificationMessages,
    notificationMessages: NotificationMessages, state: false): MessageModel {

    return {
      code: statusNumber,
      messageKey: messageKey,
      message: notificationMessages[messageKey],
      state: state
    };
  }
}

export default MessagesUtil;