import { DataSource } from "typeorm";
import { User } from "./entities/user.entity";

const { DB_PASSWORD, DB_USER, DB_HOST, DB_PORT, DB_NAME } = process.env;
let dataSource: DataSource | null = null;

export async function getDataSource(): Promise<DataSource> {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }
  dataSource = new DataSource({
    type: "cockroachdb",
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User],
    migrationsTransactionMode: "none",
    timeTravelQueries: false,
    ssl: true,
  });

  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  return dataSource;
}
