import { DataSource } from "typeorm";
import PetEntity from "../PetEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/config/database.sqlite",
  entities: [PetEntity],
  synchronize: true,
});
