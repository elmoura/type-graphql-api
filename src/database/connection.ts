import { Connection, createConnection } from "typeorm";
import { User } from "./entities/User";

let connection: Connection;

(async () => {
  await createConnection({
    name: "default",
    type: "postgres",
    port: 5432,
    host: "172.19.0.2",
    username: "docker",
    password: "docker",
    database: "graphql-example",
    entities: [User],
    synchronize: true,
    logging: true,
  });

  console.log('Connected to database');
})();

export { connection };