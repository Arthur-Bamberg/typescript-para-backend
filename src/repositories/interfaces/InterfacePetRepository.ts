import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../enum/EnumPorte";

export default interface InterfacePetRepository {
  CriaPet(pet: PetEntity): void | Promise<void>;
  listaPets(): PetEntity[] | Promise<PetEntity[]>;
  atualizaPet(
    id: number,
    pet: PetEntity,
  ): void | Promise<{ success: boolean; message?: string }>;
  deletaPet(id: number): void | Promise<{ success: boolean; message?: string }>;

  adotaPet(
    pet_id: number,
    id_adotante: number,
  ): void | Promise<{ success: boolean; message?: string }>;

  buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
    campo: Tipo,
    valor: PetEntity[Tipo],
  ): Promise<PetEntity[]> | PetEntity[];
}
