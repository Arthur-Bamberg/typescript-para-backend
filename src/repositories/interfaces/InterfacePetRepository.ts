import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
  CriaPet(pet: PetEntity): void | Promise<void>;
  listaPets(): PetEntity[] | Promise<PetEntity[]>;
  atualizaPet(
    id: number,
    pet: PetEntity,
  ): void | Promise<{ success: boolean; message?: string }>;
  deletaPet(id: number): void | Promise<{ success: boolean; message?: string }>;
}
