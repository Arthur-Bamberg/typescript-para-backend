import { Repository } from "typeorm";
import InterfaceAbrigoRepository from "./interfaces/InterfaceAbrigoRepository";
import AbrigoEntity from "../entities/AbrigoEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulaErros";

export default class AbrigoRepository implements InterfaceAbrigoRepository {
  private repository: Repository<AbrigoEntity>;

  constructor(repository: Repository<AbrigoEntity>) {
    this.repository = repository;
  }

  private async verificaEmailExistente(email: string) {
    const AbrigoComCelularExistente = await this.repository.findOne({
      where: { email },
    });

    if (AbrigoComCelularExistente)
      throw new RequisicaoRuim("Já existe um Abrigo com esse email");
  }

  private async verificaCelularExistente(celular: string) {
    const AbrigoComCelularExistente = await this.repository.findOne({
      where: { celular },
    });

    if (AbrigoComCelularExistente)
      throw new RequisicaoRuim("Já existe um Abrigo com esse celular");
  }

  async criaAbrigo(Abrigo: AbrigoEntity): Promise<void> {
    await Promise.all([
      this.verificaEmailExistente(Abrigo.email),
      this.verificaCelularExistente(Abrigo.celular),
    ]);

    await this.repository.save(Abrigo);
  }
  async listaAbrigos(): Promise<AbrigoEntity[]> {
    return await this.repository.find();
  }
  async atualizaAbrigo(id: number, newData: AbrigoEntity) {
    const AbrigoToUpdate = await this.repository.findOne({ where: { id } });

    if (!AbrigoToUpdate) throw new NaoEncontrado("Abrigo não encontrado");

    Object.assign(AbrigoToUpdate, newData);

    await this.repository.save(AbrigoToUpdate);

    return { success: true };
  }

  async deletaAbrigo(id: number) {
    const AbrigoToRemove = await this.repository.findOne({ where: { id } });

    if (!AbrigoToRemove) throw new NaoEncontrado("Abrigo não encontrado");

    await this.repository.remove(AbrigoToRemove);

    return { success: true };
  }

  async atualizaEnderecoAbrigo(id: number, endereco: EnderecoEntity) {
    const Abrigo = await this.repository.findOne({ where: { id } });

    if (!Abrigo) throw new NaoEncontrado("Abrigo não encontrado");

    const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);
    Abrigo.endereco = novoEndereco;
    await this.repository.save(Abrigo);

    return { success: true };
  }
}
