import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { Request, Response } from "express";
import {
  TipoRequestBodyAbrigo,
  TipoRequestParamsAbrigo,
  TipoResponseBodyAbrigo,
} from "../tipos/tiposAbrigo";

export default class AbrigoController {
  constructor(private readonly repository: AbrigoRepository) {}
  async criaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>,
  ) {
    const { nome, email, celular, endereco, senha } = <AbrigoEntity>req.body;

    const novoAbrigo = new AbrigoEntity(nome, email, senha, celular, endereco);

    await this.repository.criaAbrigo(novoAbrigo);
    return res
      .status(201)
      .json({
        dados: { id: novoAbrigo.id, nome, celular, endereco },
      } as TipoResponseBodyAbrigo);
  }

  async atualizaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>,
  ) {
    const { id } = req.params;
    await this.repository.atualizaAbrigo(Number(id), req.body as AbrigoEntity);

    return res.sendStatus(204);
  }

  async listaAbrigos(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>,
  ) {
    const listaDeAbrigos = await this.repository.listaAbrigos();

    const dados = listaDeAbrigos.map((Abrigo) => {
      return {
        id: Abrigo.id,
        email: Abrigo.email,
        nome: Abrigo.nome,
        celular: Abrigo.celular,
        endereco: Abrigo.endereco ?? undefined,
      };
    });

    return res.json({ dados });
  }

  async deletaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>,
  ) {
    const { id } = req.params;

    await this.repository.deletaAbrigo(Number(id));

    return res.sendStatus(204);
  }

  async atualizaEnderecoAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, EnderecoEntity>,
    res: Response<TipoResponseBodyAbrigo>,
  ) {
    const { id } = req.params;

    await this.repository.atualizaEnderecoAbrigo(Number(id), req.body);

    return res.sendStatus(204);
  }
}
