require('dotenv').config();


class DatabaseConfig {

    /**
     * Method to get the database configuration.
     * 
     * @returns object
     */
      public static getDbConfig(): Object {
        return {
          connectionLimit: this.getPoolLimit(),
          host: this.getHost(),
          user: this.getUsername(),
          password: this.getPassword(),
          database: this.getDataName(),
          port: this.getListenPort()
        };
      }
    
    
    
      /**
       * Method to get the number of pool connections.
       * 
       * @returns number
       */
      private static getPoolLimit(): number | undefined {
        const poolLimit: string | undefined = process.env.DB_CONNEXION_LIMIT;
        if (poolLimit === undefined) {
          console.error("No connection limit set for the database");
        } else {
          return parseInt(poolLimit);
        }
      }
    
      /**
       * Method to get the port address of the database.
       * 
       * @returns number
       */
      private static getListenPort(): number | undefined {
        const portConfig: string | undefined = process.env.DB_PORT;
        if (portConfig === undefined) {
          console.error("No port set for the database");
        } else {
          return parseInt(portConfig);
        }
      }
    
      /**
       * Method to get the name of the database set.
       * 
       * @returns string
       */
      private static getDataName(): string | undefined {
        const dbName: string | undefined = process.env.DB_DATA;
        if (dbName === undefined) {
          console.error("No database name set");
        } else {
          return dbName;
        }
      }
    
      /**
       * Method to get the name of the user.
       * 
       * @returns string
       */
      private static getUsername(): string | undefined {
        const dbUser: string | undefined = process.env.DB_USER;
        if (dbUser === undefined) {
          console.error("No user set for the database");
        } else {
          return dbUser;
        }
      }
    
      /**
       * Method to get the password.
       * 
       * @returns string
       */
      private static getPassword(): string | undefined {
        const dbPass: string | undefined = process.env.DB_PASS;
        if (dbPass === undefined) {
          console.error("No password set for the database");
        } else {
          return dbPass;
        }

      }
    
      /**
       * Method to get the hostname.
       * 
       * @returns string
       */
      private static getHost(): string | undefined {
        const dbHost: string | undefined = process.env.DB_HOST;
        if (dbHost === undefined) {
          console.error("No host set for the database");
        } else {
          return dbHost;
        }
      }
    
    
    }
    
    export default DatabaseConfig;