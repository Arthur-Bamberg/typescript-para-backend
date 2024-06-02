import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../PetEntity";

export default class PetController {
  constructor(private readonly repository: PetRepository) {}

  async criaPet(req: Request, res: Response) {
    const { nome, especie, adotado, dataDeNascimento } = <PetEntity>req.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ mensagem: "Espécie inválida" });
    }

    const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);

    await this.repository.CriaPet(novoPet);
    return res.status(201).json(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPets();
    return res.status(200).json(listaDePets);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity,
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }
}
