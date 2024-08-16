import { DataSource } from "typeorm";
import { User } from "./entities/user";

const { DB_PASSWORD, DB_USER, DB_HOST, DB_PORT, DB_NAME } = process.env;

export const AppDataSource = new DataSource({
  type: "cockroachdb",
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: false,
  logging: true,
  entities: [User],
  migrations: ["./migrations"],
  migrationsTransactionMode: "none",
  timeTravelQueries: true,
  ssl: true,
});
