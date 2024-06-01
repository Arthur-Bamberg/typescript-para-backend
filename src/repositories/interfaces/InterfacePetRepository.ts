import PetEntity from "../../PetEntity";

export default interface InterfacePetRepository {
    CriaPet(pet: PetEntity): void
    listaPets(): PetEntity[]
    atualizaPet(pet: PetEntity): void
    deletaPet(id: number): void
}