import { Response } from "express";
import { getJsonResponse } from "../functions/notifications";
import { contactApi } from "../functions/request";
import { notificationMessages } from "../config/notifications-config";
import validator from 'validator';
// import { baseUrl } from '../config';

export const handleUserService = async (res: Response, slug: string, action: string, email: string, passwordClient: string, username: string, authorization: string) => {
  try {
    // Clean the slug and action to prevent XSS attacks
    slug = validator.escape(slug);
    action = validator.escape(action);

    // Check if the param is defined
    if (!slug) {
      getJsonResponse(res, 400, "no-param-name", notificationMessages, false);
      return;
    }

    // Check if the param is defined
    if (!action) {
      getJsonResponse(res, 400, "no-query-name", notificationMessages, false);
      return;
    }

    // Build the uri
    const uri: string = `user/v1/${slug}/${action}`;

    console.log('GATEWAY ->', ' Route user/', slug);
    console.log('GATEWAY ->', ' Valeur de action : ', action);
    console.log('GATEWAY ->', ' Valeur de uri : ', uri);
    console.log('GATEWAY ->', ' Valeur de email : ', email);
    console.log('GATEWAY ->', ' Valeur de username : ', username);
    console.log('GATEWAY ->', ' Valeur de password : ', passwordClient);
    console.log('GATEWAY ->', ' Valeur de authorization : ', authorization);

    // await contactApi(uri, res, 'post', baseUrl.apiUser, email, passwordClient, username, authorization);
  } catch (error) {
    console.error('Error handling user service request:', error);
    getJsonResponse(res, 500, "internal-server-error", notificationMessages, false);
    throw error;
  }
};