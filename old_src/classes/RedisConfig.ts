require('dotenv').config();


class RedisConfig {

    /**
     * Method to get the database configuration.
     * 
     * @returns object
     */
      public static getRedisConfig(): Object {
        return {
          expiration: this.getTimeLimit(),
          port: this.getListenPort()
        };
      }
    
    
    
      /**
       * Method to get the number of pool connections.
       * 
       * @returns number
       */
      private static getTimeLimit(): number | undefined {
        const poolLimit: string | undefined = process.env.REDIS_EXPIRATION;
        if (poolLimit === undefined) {
          console.error("No time limit set for the cache");
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
        const portConfig: string | undefined = process.env.REDIS_PORT;
        if (portConfig === undefined) {
          console.error("No port set for the cache");
        } else {
          return parseInt(portConfig);
        }
      }
    
     
    
    
    }
    
    export default RedisConfig;