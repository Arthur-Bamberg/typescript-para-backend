import express from "express";
import PetController from "../Controller/PetController";

const router = express.Router();

const petController = new PetController();

router.post("/", petController.criaPet);

export default router;