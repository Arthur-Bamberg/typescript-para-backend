import AbrigoEntity from "../../entities/AbrigoEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface InterfaceAbrigoRepository {
  criaAbrigo(Abrigo: AbrigoEntity): void | Promise<void>;
  listaAbrigos(): AbrigoEntity[] | Promise<AbrigoEntity[]>;

  atualizaAbrigo(id: number, Abrigo: AbrigoEntity): void;

  deletaAbrigo(id: number): void;

  atualizaEnderecoAbrigo(id: number, endereco: EnderecoEntity): void;
}
