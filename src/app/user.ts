export interface User {
    __v:                     number;
    _id:                     string;
    user_available:          boolean;
    user_cellphone:          number;
    user_code:               number;
    user_color:              string;
    user_creation_date:      number;
    user_dni:                number;
    user_email:              string;
    user_false_incidents:    any[];
    user_fullname:           string;
    user_lastname:           string;
    user_name:               string;
    user_password:           string;
    user_photo:              string;
    user_position:           string;
    user_role:               string;
    user_state:              boolean;
    user_true_incidents:     any[];
    user_username:           string;
    web_catastro:            boolean;
    web_inspecciones:        boolean;
    web_rentas:              boolean;
    web_seguridad_ciudadana: boolean;
    workgroup_name:          string;
}
export interface Data {
    data:    any;
    message: string;
    success: number;
   }
