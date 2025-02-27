import { Response } from "express";
import { ItemModelResponse } from "../models/user-nav.models";
import { getJsonResponse } from "../functions/notifications";
import { handlePermissionsRequest } from "../functions/request";
import { hasPermission } from "../functions/permissions";
import { notificationMessages } from "../config/notifications-config";
// import { baseUrl } from '../config';

export const handleIndexService = async (res: Response, token: string | null): Promise<any> => {
  console.log('5')
  try {
    // const response = await fetch(`${baseUrl.apiInterface}/interface/v1/index?element=user_nav`);
    let data: ItemModelResponse = await response.json();
    console.log('6')
    if (!token) {
      return data;
    }
    console.log('7')
    const permissionsResponse = await handlePermissionsRequest(res, token, 'footer-nav');
    
    if (!permissionsResponse) {
      getJsonResponse(res, 400, "no-permissions", notificationMessages, false);
      return;
    }

    if (permissionsResponse && "permissions" in permissionsResponse && Array.isArray(permissionsResponse.permissions)) {
      console.log('9')
      const role: number = permissionsResponse.roles.id_role;
      const userPermissions = permissionsResponse.permissions.map((perm) => perm.permission_code);
      
      if (role === 1) {
        data = hasPermission(data, userPermissions, 'CREATE_MEMO', 'Créer');
        data = hasPermission(data, userPermissions, 'FAVORITE_MEMO', 'Favoris');
        data = hasPermission(data, userPermissions, 'PERSONNAL_MEMO', 'Mes mémos');
      } else if (role === 2) {
        data = hasPermission(data, userPermissions, 'CREATE_MEMO', 'Créer');
        data = hasPermission(data, userPermissions, 'FAVORITE_MEMO', 'Favoris');
      } else if (role === 3) {
        data = hasPermission(data, userPermissions, 'FAVORITE_MEMO', 'Favoris');
      }
    }
    
    
    console.log('10')
    return data;
  } catch (error) {
    console.error('Error handling index page request:', error);
    getJsonResponse(res, 500, "internal-server-error", notificationMessages, false);
    throw error;
  }
};