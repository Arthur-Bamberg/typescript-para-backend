import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import AdotanteRepository from "../repositories/AdotanteRepository";
import { Request, Response } from "express";
import {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante,
} from "../tipos/tiposAdotante";

export default class AdotanteController {
  constructor(private readonly repository: AdotanteRepository) {}
  async criaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    try {
      const { nome, celular, endereco, foto, senha } = <AdotanteEntity>req.body;

      const novoAdotante = new AdotanteEntity(
        nome,
        senha,
        celular,
        foto,
        endereco,
      );

      await this.repository.criaAdotante(novoAdotante);
      return res
        .status(201)
        .json({ dados: { id: novoAdotante.id, nome, celular, endereco } });
    } catch (erros) {
      // return res.status(500).json({ erros: "Erro ao criar o adotante" });
    }
  }

  async atualizaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as AdotanteEntity,
    );

    if (!success) {
      return res.status(404).json({ erros: message });
    }

    return res.sendStatus(204);
  }

  async listaAdotantes(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    const listaDeAdotantes = await this.repository.listaAdotantes();

    const dados = listaDeAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
        endereco: adotante.endereco ?? undefined,
      };
    });

    return res.json({ dados });
  }

  async deletaAdotante(
    req: Request<TipoRequestParamsAdotante, {}, TipoRequestBodyAdotante>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAdotante(
      Number(id),
    );

    if (!success) {
      return res.status(404).json({ erros: message });
    }
    return res.sendStatus(204);
  }

  async atualizaEnderecoAdotante(
    req: Request<TipoRequestParamsAdotante, {}, EnderecoEntity>,
    res: Response<TipoResponseBodyAdotante>,
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaEnderecoAdotante(
      Number(id),
      req.body,
    );

    if (!success) {
      return res.status(404).json({ erros: message });
    }
    return res.sendStatus(204);
  }
}
