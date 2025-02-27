export class DbConfig {
  connectionLimit: number | undefined;
  host: string | undefined;
  user: string | undefined;
  password: string | undefined;
  database: string | undefined;
  port: number | undefined;
}

export class RedisConfigModel {
  expiration: number | undefined;
  host: string | undefined;
  port: number | undefined;
}
