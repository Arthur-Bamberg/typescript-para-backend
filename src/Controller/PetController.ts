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
      .json({ dados: { id: novoPet.id, nome, especie, porte } });
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
      return res.status(404).json({ erros: message });
    }
    return res.sendStatus(204);
  }

  async listaPets(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const listaDePets = await this.repository.listaPets();

    const dados = listaDePets.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte ?? undefined,
      };
    });

    return res.status(200).json({ dados });
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
      return res.status(404).json({ erros: message });
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
      return res.status(404).json({ erros: message });
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
    return res.status(200).json({ dados: listaDePets });
  }
}
