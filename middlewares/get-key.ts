/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

import { Express, Request, Response, NextFunction } from "express";

// importation of notifications messages
import { notificationMessages } from "../datas/notifications";
import { getJsonResponse } from "../functions/notifications";

import { QueryUser } from "../queries/UserQuery";

/////////////////////////////////////////////////////
///////////    LIBRARIES   IMPORTATIONS   ///////////
/////////////////////////////////////////////////////

// Mysql library importation and pool connexion creation
import DatabaseConfig from "../classes/DatabaseConfig";
import mysql, { PoolConnection } from "mysql";
import { isMaxConnectionReached } from "../functions/pool";
const dbconnect = mysql.createPool(DatabaseConfig.getDbConfig());

/**
 *
 * function to verify the token for certain routes
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export function getKey(req: any, res: Response, next: NextFunction) {

  // Get the id_user from the token
  const idUserFromToken: number = req.results.id_user;

  // Create the connection to the database
  dbconnect.getConnection((error: Error, connection: PoolConnection) => {
    // Check if we can connect to the database
    if (error) {
      getJsonResponse(res, 500, "dbconnect-error", notificationMessages, false);
      return;
    }

    // Check if we reached the maximum of connection allowed
    if (isMaxConnectionReached(dbconnect)) {
      getJsonResponse( res, 500, "maxconnect-reached", notificationMessages, false);
      connection.release();
      return;
    }

    // execute and prepare the query
    connection.query(QueryUser.fetchAllUsers(idUserFromToken), (error: Error | null, results: any) => {
      if (error) {
          getJsonResponse( res, 500, "request-failure", notificationMessages, false);
        connection.release();
        return;
      }

      connection.release();



      if ((idUserFromToken !== results[0].id_user) || results.length === 0 || (results[0].key_hash === null) || (results[0].key_hash === undefined)) {
        getJsonResponse( res, 500, "no-access", notificationMessages, false);
        return;
      }
        // Add the results to the request object
        req.databaseApiKeyResults = {
            id_user: results[0].id_user,
            key_hash: results[0].key_hash,
            key_name: results[0].key_name
          };
          
      next();
    });
  });

}
