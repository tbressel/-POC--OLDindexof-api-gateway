//////////////////////////////////////////////////
//////////////     TYPE DEFINITION   /////////////
//////////////////////////////////////////////////
import { NotificationMessages } from '../../src/core/models/NotificationModel';


//////////////////////////////////////////////////
//////////////      MESSAGES LIST    /////////////
//////////////////////////////////////////////////

export const notificationMessages: NotificationMessages = {
    "no-param-name": "The param is not defined",
    "no-query-name": "The page query is not defined",
    "parameter-missing": "A parameter is missing",
    "invalid-page-name": "The page name is invalid",
    "fetch-fail": "Error fetching page data",
    "missing-email": "The request misses the email",
    "email_bad_format" : "Attention, l'adresse mail n'est pas au bon format",
    "fail": "The email does not exist",
    'gateway-error': "Probleme to contact the user route from gateway API",
    "no-permissions": "Aucune permission"
    
}