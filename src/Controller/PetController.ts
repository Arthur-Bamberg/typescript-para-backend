import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";

export default class PetController {
  constructor(private readonly repository: PetRepository) {}

  async criaPet(req: Request, res: Response) {
    const { nome, especie, dataDeNascimento, porte } = <PetEntity>req.body;

    if (!(especie in EnumEspecie)) {
      return res.status(400).json({ mensagem: "Espécie inválida" });
    }

    if (porte && !(porte in EnumPorte)) {
      return res.status(400).json({ mensagem: "Porte inválido" });
    }

    const novoPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      false,
      porte,
    );

    await this.repository.CriaPet(novoPet);
    return res.status(201).json(novoPet);
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, id_adotante } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(id_adotante),
    );
    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
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
