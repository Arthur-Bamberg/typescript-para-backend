import express from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./config/dataSource";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado");
  })
  .catch((erro) => {
    console.error(erro);
  });

export default app;
