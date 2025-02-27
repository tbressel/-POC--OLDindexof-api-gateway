import { ItemModelResponse } from "old_src/models/user-nav.models";

export function hasPermission(data: ItemModelResponse, userPermissions: string[], permissionName: string, elementName: string): ItemModelResponse {
    const hasPermission = userPermissions.includes(permissionName);
    data.result = data.result.map((item: any) => ({
        ...item,
        is_active: item.item_name === elementName ? hasPermission : item.is_active
    }));
    return data;
}