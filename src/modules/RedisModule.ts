require('dotenv').config();
import { createClient, RedisClientType } from "redis";
import { RedisConfigModel } from "../core/models/DatabaseModel";

class RedisModule {
  private static client: RedisClientType;

  public static get redisConfig(): RedisConfigModel {
    return {
      expiration: this.timeLimit,
      host: this.host,
      port: this.listenPort
    };
  }

  public static get getClient(): RedisClientType {
    if (!this.client) {
      const redisConfig = this.redisConfig;
      const redisUrl = `redis://${redisConfig.host}:${redisConfig.port}`;
      this.client = createClient({ url: redisUrl });

      this.client.on("error", (error) => console.error("Redis Error:", error));
    }
    return this.client;
  }

  private static get timeLimit(): number {
    const timeLimit: string | undefined = process.env.REDIS_EXPIRATION;
    if (timeLimit === undefined) {
      console.error("No time limit set for the cache");
      return 0;
    } else {
      return parseInt(timeLimit);
    }
  }

  private static get host(): string {
    const hostConfig: string | undefined = process.env.REDIS_HOST;
    if (hostConfig === undefined) {
      console.error("No host set for the cache");
      return "";
    } else {
      return hostConfig;
    }
  }

  private static get listenPort(): number {
    const portConfig: string | undefined = process.env.REDIS_PORT;
    if (portConfig === undefined) {
      console.error("No port set for the cache");
      return 0;
    } else {
      return parseInt(portConfig);
    }
  }


  public static async connect(): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
  }

  public static async disconnect(): Promise<void> {
    if (this.client.isOpen) {
      await this.client.quit();
    }
  }

}

export default RedisModule;