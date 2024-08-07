import express, { RequestHandler } from "express";
import PetController from "../Controller/PetController";
import { AppDataSource } from "../config/dataSource";
import PetRepository from "../repositories/PetRepository";
import { middlewareValidadorBodyPet } from "../middleware/validadores/petRequestBody";
import { verificaIdMiddleware } from "../middleware/validadores/verificaId";

const router = express.Router();

const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity"),
);

const petController = new PetController(petRepository);

const validateBodyPet: RequestHandler = (req, res, next) =>
  middlewareValidadorBodyPet(req, res, next);

router.post("/", validateBodyPet, (req, res) =>
  petController.criaPet(req, res),
);

router.get("/", (req, res) => petController.listaPets(req, res));

router.put("/:id", verificaIdMiddleware, (req, res) =>
  petController.atualizaPet(req, res),
);

router.put("/:pet_id/:id_adotante", verificaIdMiddleware, (req, res) =>
  petController.adotaPet(req, res),
);

router.delete("/:id", verificaIdMiddleware, (req, res) =>
  petController.deletaPet(req, res),
);

router.get("/filtro", (req, res) =>
  petController.buscaPetPorCampoGenerico(req, res),
);

export default router;
