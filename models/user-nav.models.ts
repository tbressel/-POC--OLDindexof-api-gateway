// Type pour la structure de chaque item
export interface ItemModel {
    id_item: number;
    item_name: string;
    item_slug: string;
    item_icon: string;
    is_active: boolean;
    is_enable: boolean;
  }
  
  // Type pour la structure complète des données
  export interface ItemModelResponse {
    result: ItemModel[];
  }
  