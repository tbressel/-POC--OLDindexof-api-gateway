// import dotenv from 'dotenv';
require('dotenv').config();
 

/**
 * Class to manage the server configuration
 */
class ServerConfig {

  /**
   * 
   * Method to get the port address of the server.
   * 
   * @returns number
   */
  public static getApiListenPort(): number {

    // Get the port from the environment variable
    const portConfig: string | undefined = process.env.API_LISTEN_PORT;

    // Check if the port is defined
    if (portConfig == undefined) {
      console.error("No adress port defined for the server");
      process.exit(1);
    } else {
      const port: number = parseInt(portConfig);
      return port;
    }
  }
  /**
   * 
   * Method to get the API name.
   * 
   * @returns number
   */
  public static getName(): string {

    // Get the port from the environment variable
    const nameConfig: string | undefined = process.env.API_NAME;

    // Check if the port is defined
    if (nameConfig == undefined) {
      console.error("No name defined for the API");
      process.exit(1);
    } else {
      const port: string = nameConfig;
      return port;
    }
  }
  /**
   * 
   * Method to get the port address of the server.
   * 
   * @returns number
   */
  public static getVersion(): string {

    // Get the port from the environment variable
    const versionConfig: string | undefined = process.env.API_VERSION;

    // Check if the port is defined
    if (versionConfig == undefined) {
      console.error("No version  defined for the Api");
      process.exit(1);
    } else {
      const port: string = versionConfig;
      return port;
    }
  }
}

export default ServerConfig;
