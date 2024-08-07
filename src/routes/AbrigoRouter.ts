import express, { RequestHandler } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { AppDataSource } from "../config/dataSource";
import { middlewareValidadorBodyEndereco } from "../middleware/validadores/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/validadores/verificaId";
import { middlewareValidadorBodyAbrigo } from "../middleware/validadores/abrigoRequestBody";
import AbrigoController from "../Controller/AbrigoController";

const router = express.Router();
const abrigoRepository = new AbrigoRepository(
  AppDataSource.getRepository("AbrigoEntity"),
);
const abrigoController = new AbrigoController(abrigoRepository);

const validateBodyAbrigo: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyAbrigo(req, res, next);

const validateBodyEndereco: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyEndereco(req, res, next);

router.post("/", validateBodyAbrigo, (req, res) =>
  abrigoController.criaAbrigo(req, res),
);

router.get("/", (req, res) => abrigoController.listaAbrigos(req, res));

router.put("/:id", verificaIdMiddleware, (req, res) =>
  abrigoController.atualizaAbrigo(req, res),
);

router.delete("/:id", verificaIdMiddleware, (req, res) =>
  abrigoController.deletaAbrigo(req, res),
);

router.patch("/:id", verificaIdMiddleware, validateBodyEndereco, (req, res) =>
  abrigoController.atualizaEnderecoAbrigo(req, res),
);

export default router;
