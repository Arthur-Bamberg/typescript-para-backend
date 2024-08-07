import { Repository } from "typeorm";
import InterfaceAdotanteRepository from "./interfaces/InterfaceAdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AdotanteRepository implements InterfaceAdotanteRepository {
  private repository: Repository<AdotanteEntity>;

  constructor(repository: Repository<AdotanteEntity>) {
    this.repository = repository;
  }

  async criaAdotante(adotante: AdotanteEntity): Promise<void> {
    const adotanteComCelularExistente = await this.repository.findOne({
      where: { celular: adotante.celular },
    });

    if (adotanteComCelularExistente)
      throw new RequisicaoRuim("Já existe um adotante com esse celular");

    await this.repository.save(adotante);
  }
  async listaAdotantes(): Promise<AdotanteEntity[]> {
    return await this.repository.find();
  }
  async atualizaAdotante(id: number, newData: AdotanteEntity) {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });

    if (!adotanteToUpdate) throw new NaoEncontrado("Adotante não encontrado");

    Object.assign(adotanteToUpdate, newData);

    await this.repository.save(adotanteToUpdate);

    return { success: true };
  }

  async deletaAdotante(id: number) {
    const adotanteToRemove = await this.repository.findOne({ where: { id } });

    if (!adotanteToRemove) throw new NaoEncontrado("Adotante não encontrado");

    await this.repository.remove(adotanteToRemove);

    return { success: true };
  }

  async atualizaEnderecoAdotante(id: number, endereco: EnderecoEntity) {
    const adotante = await this.repository.findOne({ where: { id } });

    if (!adotante) throw new NaoEncontrado("Adotante não encontrado");

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    adotante.endereco = novoEndereco;
    await this.repository.save(adotante);

    return { success: true };
  }
}
