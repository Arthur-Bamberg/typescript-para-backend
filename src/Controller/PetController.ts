import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../PetEntity";

let listaDePets: TipoPet[] = [];

let id = 0;
function geraId() {
  id++;
  return id;
}

export default class PetController {
  constructor(private readonly petRepository: PetRepository) {}

  criaPet(req: Request, res: Response) {
    const { nome, especie, adotado, dataDeNascimento } = <PetEntity>req.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ mensagem: "Espécie inválida" });
    }

    const novoPet: PetEntity = {
      id: geraId(),
      nome,
      especie,
      adotado,
      dataDeNascimento,
    };

    this.petRepository.CriaPet(novoPet);
    return res.status(201).json(novoPet);
  }

  listaPets(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, especie, adotado, dataDeNascimento } = <TipoPet>req.body;

    if (Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ mensagem: "Espécie inválida" });
    }

    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ mensagem: "Pet não encontrado" });
    }

    Object.assign(pet, { nome, especie, adotado, dataDeNascimento });

    return res.status(200).json(pet);
  }

  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const petIndex = listaDePets.findIndex((pet) => pet.id === Number(id));
    if (petIndex === -1) {
      return res.status(404).json({ mensagem: "Pet não encontrado" });
    }

    listaDePets.splice(petIndex, 1);

    return res.status(200).json({ mensagem: "Pet deletado com sucesso" });
  }
}
