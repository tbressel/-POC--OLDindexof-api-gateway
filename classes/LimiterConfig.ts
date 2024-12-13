require('dotenv').config();


class DdosLimiterConfig {

    /**
     * Method to get the limiter configuration.
     * 
     * @returns object
     */
      public static getRequestLimiterConfig(): Object {
        return {
            windowMs: this.getTime(),
            max: this.getMax(),
            handler: (req: any, res: any) => {
                console.log(`Limite atteinte pour l'IP : ${req.ip}`);
                res.status(429).send('Trop de requêtes, veuillez réessayer plus tard.');
              }
        };
      }



    /**
     * Method to get the limiter configuration.
     * 
     * @returns object
     */
      public static getSpeedLimiterConfig(): Object {
        return {
          windowMs: this.getTime(),
          delayAfter: this.getAfterDelay(),
          delayMs: this.getDurationDelay(),
        };
      }
    
    
    
      /**
       * Method to get the number of pool connections.
       * 
       * @returns number
       */
      private static getTime(): number | undefined {
        const timeLimit: string | undefined = process.env.DDOS_WINDOW_MS;
        if (timeLimit === undefined) {
          console.error("No time limit set for the ddos");
        } else {
          return parseInt(timeLimit);
        }
      }
    


      /**
       * Method to get the port address of the database.
       * 
       * @returns number
       */
      private static getMax(): number | undefined {
        const max: string | undefined = process.env.DDOS_MAX_REQUESTS;
        if (max === undefined) {
          console.error("No port set for the database");
        } else {
          return parseInt(max);
        }
      }
    


      /**
       * Method to get the name of the database set.
       * 
       * @returns number
       */
      private static getAfterDelay(): number | undefined {
        const afterDelay: string | undefined = process.env.DDOS_AFTER_DELAY_MS;
        if (afterDelay === undefined) {
          console.error("No database name set");
        } else {
          return parseInt(afterDelay);
        }
      }
    
      /**
       * Method to get the name of the user.
       * 
       * @returns string
       */
      private static getDurationDelay(): number | undefined {
        const durationDelay: string | undefined = process.env.DDOS_DURATION_DELAY_MS;
        if (durationDelay === undefined) {
          console.error("No user set for the database");
        } else {
          return parseInt(durationDelay);
        }
      }
    
     
    
    
    }
    
    export default DdosLimiterConfig;