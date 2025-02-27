// import dotenv from 'dotenv';
require('dotenv').config();
 

/**
 * Class to manage the server configuration
 */
class ServerModule {

  /**
   * 
   * Method to get the port address of the server.
   * 
   * @returns number
   */
  public static getApiListenPort(): number {
    const portConfig: string | undefined = process.env.API_LISTEN_PORT;
    return portConfig !== undefined ? parseInt(portConfig) : (
      () => { 
        console.error("No address port defined for the server");
        process.exit(1); 
      }
    )();
  }
  /**
   * 
   * Method to get the API name.
   * 
   * @returns number
   */
  public static getName(): string {
    const nameConfig: string | undefined = process.env.API_NAME;
    return nameConfig !== undefined ? nameConfig : (
      () => { 
        console.error("No name defined for the API");
        process.exit(1);
      }
    )();
  }
  /**
   * 
   * Method to get the port address of the server.
   * 
   * @returns number
   */
  public static getVersion(): string {
    const versionConfig: string | undefined = process.env.API_VERSION;
    return versionConfig !== undefined ? versionConfig : (
      () => {
        console.error("No version defined for the API");
        process.exit(1);
      }
    )();
  }
}

export default ServerModule;
