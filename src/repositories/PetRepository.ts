import { Repository } from "typeorm";
import PetEntity from "../PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository {
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }

    CriaPet(pet: PetEntity): void {
        this.repository.save(pet);
    }
    
    listaPets(): PetEntity[] {
        throw new Error("Method not implemented.");
    }
    atualizaPet(pet: PetEntity): void {
        throw new Error("Method not implemented.");
    }
    deletaPet(id: number): void {
        throw new Error("Method not implemented.");
    }
    
}