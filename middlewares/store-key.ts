/////////////////////////////////////
////////   IMPORTATIONS   ///////////
/////////////////////////////////////

import { Request, Response, NextFunction } from "express";

import RedisConfig from "../classes/RedisConfig";
import { RedisConfigModel } from "../models/database.models";

// importation of notifications messages


////////////////////////////////////////
////////   REDIS CONNEXION   ///////////
////////////////////////////////////////
const redis = require("redis");

const redisConfig: RedisConfigModel =
  RedisConfig.getRedisConfig() as RedisConfigModel;

// Create a new Redis instance
const redisClient = redis.createClient({
  port: redisConfig.port,
});

// Gérer les erreurs de connexion
redisClient.on("error", (error: Error) => {
  console.error("Erreur de connexion à Redis :", error);
});

/**
 *
 * Middleware to store the API key in Redis.
 *
 *
 * @param req
 * @param res
 * @param next
 */
export const storeKey = async (req: any, res: Response, next: NextFunction) => {
  
  const apiKeyFromRequest: string = req.databaseApiKeyResults.key_hash;
  const idUserFromRequest: string = req.databaseApiKeyResults.id_user.toString();

  // Connecter le client Redis
  redisClient.connect().catch(console.error);
  try {
    // add the expired token to Redis database
    await redisClient.set(idUserFromRequest, apiKeyFromRequest, {
      EX: redisConfig.expiration,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du token expiré à Redis :", error);
  } finally {
    
    // Fermer la connexion Redis
    await redisClient.quit();
  }
  next();
};
