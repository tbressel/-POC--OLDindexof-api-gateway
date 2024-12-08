// Type pour la structure des box
export interface BoxModel {
    id_box: number;
    box_category: string;
    box_title: string;
    box_icon: string | null;
    box_description: string;
    button_txt: string;
    is_display_box: boolean;
    is_display_icon: boolean;
    is_display_btn: boolean;
  }
  
  // Type pour la structure des données complètes
  export interface BoxModelResponse {
    boxes: BoxModel[];
  }