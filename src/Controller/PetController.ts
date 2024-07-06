import { Request, Response } from "express";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
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
    const { nome, especie, dataDeNascimento, porte, adotado } = <PetEntity>(
      req.body
    );

    const novoPet = new PetEntity(
      nome,
      especie,
      dataDeNascimento,
      adotado,
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
    await this.repository.adotaPet(Number(pet_id), Number(id_adotante));

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
    await this.repository.atualizaPet(Number(id), req.body as PetEntity);

    return res.sendStatus(204);
  }

  async deletaPet(
    req: Request<TipoRequestParamsPet, {}, TipoRequestBodyPet>,
    res: Response<TipoResponseBodyPet>,
  ) {
    const { id } = req.params;

    await this.repository.deletaPet(Number(id));

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
