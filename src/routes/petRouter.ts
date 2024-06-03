import express from "express";
import PetController from "../Controller/PetController";
import { AppDataSource } from "../config/dataSource";
import PetRepository from "../repositories/PetRepository";

const router = express.Router();

const petRepository = new PetRepository(
  AppDataSource.getRepository("PetEntity"),
  AppDataSource.getRepository("AdotanteEntity"),
);

const petController = new PetController(petRepository);

router.post("/", (req, res) => petController.criaPet(req, res));

router.get("/", (req, res) => petController.listaPets(req, res));

router.put("/:id", (req, res) => petController.atualizaPet(req, res));

router.put("/:pet_id/:id_adotante", (req, res) =>
  petController.adotaPet(req, res),
);

router.delete("/:id", (req, res) => petController.deletaPet(req, res));

export default router;
