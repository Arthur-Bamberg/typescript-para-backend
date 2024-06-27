import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../enum/EnumPorte";
import {
  TipoRequestBodyPet,
  TipoRequestParamsPet,
  TipoResponseBodyPet,
} from "../tipos/tiposPet";

export default class PetController {
  constructor(private readonly repository: PetRepository) {}

  async criaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { nome, especie, dataDeNascimento, porte } = <PetEntity>req.body;

    if (!(especie in EnumEspecie)) {
      return res.status(400).json({ error: "Espécie inválida" });
    }

    if (porte && !(porte in EnumPorte)) {
      return res.status(400).json({ error: "Porte inválido" });
    }

    const novoPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      false,
      porte,
    );

    await this.repository.CriaPet(novoPet);
    return res
      .status(201)
      .json({ data: { id: novoPet.id, nome, especie, porte } });
  }

  async adotaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { pet_id, id_adotante } = req.params;
    const { success, message } = await this.repository.adotaPet(
      Number(pet_id),
      Number(id_adotante),
    );
    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(204);
  }

  async listaPets(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const listaDePets = await this.repository.listaPets();

    const data = listaDePets.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte,
      };
    });

    return res.status(200).json({ data });
  }

  async atualizaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(
      Number(id),
      req.body as PetEntity,
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(204);
  }

  async deletaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaPet(Number(id));

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(204);
  }

  async buscaPetPorCampoGenerico(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { campo, valor } = req.query;
    const listaDePets = await this.repository.buscaPetPorCampoGenerico(
      campo as keyof PetEntity,
      valor as string,
    );
    return res.status(200).json({ data: listaDePets });
  }
}
