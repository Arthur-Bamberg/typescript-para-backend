import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
  CriaPet(pet: PetEntity): void | Promise<void>;
  listaPets(): PetEntity[] | Promise<PetEntity[]>;
  atualizaPet(id: number, pet: PetEntity): void;
  deletaPet(id: number): void;

  adotaPet(pet_id: number, id_adotante: number): void;

  buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo],
  ): Promise<PetEntity[]> | PetEntity[];
}
