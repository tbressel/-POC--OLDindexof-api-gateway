
  // Define a data model for the request parameters
  export interface RequestHeaderParams {
    email?: string | undefined;
    password?: string | undefined;
    username?: string | undefined;
    authorization?: string | undefined;
    [key: string]: string | undefined;
  };



  export interface RoleObjectModel {
      "id_role": number;
      "role_name": string;
  };



export interface PermissionsObjectModel {
    "id_permission": number;
    "permission_code": string;
  };



  export interface RoleAndPermissionsObjectModel {
    "roles": RoleObjectModel;
    "permissions": PermissionsObjectModel[];
  };

