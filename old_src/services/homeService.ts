import { Response } from "express";
import { BoxModelResponse } from "../models/box.models";
import { JsonResponse } from "../../src/core/models/NotificationModel";
import { getJsonResponse } from "../functions/notifications";
import { handleHomePageRequest } from "../functions/request";
import { notificationMessages } from "../config/notifications-config";

export const handleHomeService = async (res: Response, token: string | null) => {
  try {
    const homePageRequest: BoxModelResponse | JsonResponse = await handleHomePageRequest(res, 'home', token);
    return homePageRequest;
  } catch (error) {
    console.error('Error handling home page request:', error);
    getJsonResponse(res, 500, "internal-server-error", notificationMessages, false);
    throw error;
  }
};