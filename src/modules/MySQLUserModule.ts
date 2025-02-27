require('dotenv').config();
import mysql, { Pool } from 'mysql2';

import { color } from '../config';


class MySQLUserModule {
  private static pool: Pool;



  /**
   * Method to get the database configuration.
   * 
   * @returns object
   */
  public static getDbConfig(): Object {
    return {
      connectionLimit: this.poolLimit,
      host: this.host,
      user: this.username,
      password: this.password,
      database: this.dataName,
      port: this.listenPort
    };
  }



  /**
   * Method to check if the maximum number of connections is reached.
   * 
   * @returns boolean
   */
  public static async isMaxConnectionReached(): Promise<boolean> {
    try {
      const pool = this.connectionPool;
      

      const results: any = await new Promise((resolve, reject) => {
        pool.query('SHOW STATUS LIKE "Threads_connected";', (error, results) => {
          return error ? reject(error) : resolve(results);
        });
      });
      

      if (results.length === 0) {
        console.error("No connection status found");
        return false;
      }

      
      const allConnections: number = parseInt(results[0].Value);
      const connectionsLimit: number = pool.config.connectionLimit ?? 0;
      console.log(color.bgMagenta + color.magenta, "USER REPOSITORY", " Max allowed connections: ", allConnections + "/" + connectionsLimit);

      return (allConnections >= connectionsLimit) ? true : false;


    } catch (error) {
      console.error(color.red, "Error fetching connection status: ", error);
      return false;
    }
  }


  public static get connectionPool(): Pool {
    if (!this.pool) {
      this.pool = mysql.createPool(this.getDbConfig());
    }
    return this.pool;
  }


  private static get poolLimit(): number | undefined {
    const poolLimit = process.env.DB_CONNEXION_LIMIT;
    if (poolLimit === undefined) {
      console.error("No connection limit set for the database");
      return undefined;
    }
    return parseInt(poolLimit);
  }


  private static get listenPort(): number | undefined {
    const portConfig = process.env.DB_PORT;
    if (!portConfig) {
      console.error("No port set for the database");
      return undefined;
    } else {
      return parseInt(portConfig);
    }
  }


  private static get dataName(): string | undefined {
    const dbName = process.env.DB_DATA;
    if (!dbName) {
      console.error("No database name set");
    }
    return dbName;

  }


  private static get username(): string | undefined {
    const dbUser = process.env.DB_USER;
    if (!dbUser) {
      console.error("No user set for the database");
    }
    return dbUser;

  }


  private static get password(): string | undefined {
    const dbPass = process.env.DB_PASS;
    if (!dbPass) {
      console.error("No password set for the database");
    }
    return dbPass;
  }


  private static get host(): string | undefined {
    const dbHost = process.env.DB_HOST;
    if (!dbHost) {
      console.error("No host set for the database");
    }
    return dbHost;
  }


}

export default MySQLUserModule;