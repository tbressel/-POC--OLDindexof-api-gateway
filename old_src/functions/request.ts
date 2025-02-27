import { notificationMessages } from "../config/notifications-config";
import { getJsonResponse } from "./notifications";
import { Response } from "express";

import { RequestHeaderParams, RoleObjectModel, PermissionsObjectModel, RoleAndPermissionsObjectModel } from "../models/request.models";

// import models
import { BoxModelResponse } from "../models/box.models";
import { ItemModelResponse } from "old_src/models/user-nav.models";

// import config
// import { baseUrl, color } from '../config';
import { JsonResponse } from "src/core/models/NotificationModel";

/**
 * 
 * Function to contact the API while building the header
 * 
 * @param route: string
 * @param res 
 * @param method 
 * @param baseUrl 
 * @param email 
 * @param password 
 * @param username 
 * @param authorization 
 * @returns 
 */
export async function contactApi(route: string, res: Response, method: string, baseUrl: string, email?: string, password?: string, username?: string, authorization?: string): Promise<void> {



  // Format datas to be sure to have the right format
  const headerParams: RequestHeaderParams = {
    ...(email && { email }),      // If email exists, add it to the object
    ...(password && { password }),    // If password exists, add it to the object
    ...(username && { username }),      // If username exists, add it to the object
    ...(authorization && { authorization })   // If authorization exists, add it to the object
  };
  console.log(color.bgGreen + color.white + color.red, 'GATEWAY ->', ' Données envoyé dans le header : ', headerParams);



  try {
    // Convert headerParams to a Headers object
    const headers = new Headers();
    Object.entries(headerParams).forEach(([key, value]) => {
      if (value !== undefined) {
        headers.append(key, value);
      }
    });

    // Call the user API to check if the email exists
    const response = await fetch(`${baseUrl + '/' + route}`, {
      method: method.toUpperCase(),   // Convert the method to uppercase
      headers: headers
    });



    // Check if the response is OK or not
    if (!response.ok) {
      const messageKey = (response.headers.get('x-message-key') as string);
      getJsonResponse(res, 401, messageKey, notificationMessages, false);
      return;

    } else {
      const data: Response = await response.json();
      // Send the response to the client
      res.status(200).json({ data: data });
    }



  } catch (error: unknown) {
    console.error("Error in /user route from gateway API:", error);
    getJsonResponse(res, 500, 'gateway-error', notificationMessages, false);
    return;
  }
  //  getJsonResponse(res, 500, "fetch-fail", notificationMessages, false);
  //  return;
}



/**
 * 
 * Function to handle the request to the API on the home page
 * 
 * @param res is the response object
 * @param pageName  is the name of the page to fetch
 * @param token is not required and not implemented yet
 * @returns a promise of BoxModelResponse or JsonResponse depending on the result of the fetch
 */
export const handleHomePageRequest = async (res: Response, pageName: string, token?: string | undefined | null): Promise<BoxModelResponse | JsonResponse> => {
  try {
    const response = await fetch(`${baseUrl.apiInterface}/interface/v1/${pageName}?element=box`);
    const data: BoxModelResponse = await response.json();
    console.log(color.green + color.white + color.red, 'handleHomePageRequest ->', ' Valeur de data : ', data.result[0]);

    return data;

  } catch (error) {
    return getJsonResponse(res, 500, "fetch-fail", notificationMessages, false);
  }
};





/**
 * 
 * @param res 
 * @param pageName 
 * @param token 
 * @returns 
 */
export const handlePermissionsRequest = async (res: Response, token: string, type: string): Promise<RoleAndPermissionsObjectModel | JsonResponse | null> => {

  console.log(color.bgGreen + color.white + color.red, 'handleIndexPermissionsRequest ->', ' Valeur de token : ', token);
  try {
    console.log('8')

    // Waiting for the userResponse to get user data including permissions list.
    const userResponse = await fetch(`${baseUrl.apiUser}/user/v1/session/permissions/${type}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({type})
    });

    if (!userResponse.ok) {
      const errorText = await userResponse.text();
      console.error("Response error text:", errorText);
      throw new Error(`HTTP error! status: ${userResponse.status}`);
    }


    console.log('9')

    // Should return a JsonResponse with true or false valid token and user permissions list
    const userPermissions: any = await userResponse.json();
    console.log(color.green + color.white + color.red, 'handleIndexPermissionsRequest ->', ' Valeur de userPermissions.data : ', userPermissions);



    // If userPermission return state false then return the message
    if (!userPermissions.state) {
      return userPermissions;
    };



    /**
     * Bulid the Json data and return the result
     */
    const objectWhereIdRoleAndIdPermissionExist: RoleObjectModel = userPermissions.data.find((item: any) => {
      return { "id_role": item.id_role, "role_name": item.role_name }
    });
    const objectWithUserPermissions: PermissionsObjectModel[] = userPermissions.data.map((item: any) => {
      return { "id_permission": item.id_permission, "permission_code": item.permission_code }
    });
    const result: RoleAndPermissionsObjectModel = {
      "roles": { "id_role": objectWhereIdRoleAndIdPermissionExist.id_role, "role_name": objectWhereIdRoleAndIdPermissionExist.role_name },
      "permissions": objectWithUserPermissions
    };
    console.log(color.green + color.white + color.red, 'result ->', ' Valeur de result : ', result);
    return result;
  } catch (error) {
    console.error("Error in handlePermissionsRequest:", error);
    throw new Error("Failed to fetch user permissions");
    // return getJsonResponse(res, 500, "fetch-fail", notificationMessages, false);
  }

}


