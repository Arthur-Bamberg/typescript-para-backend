import PetEntity from "../entities/PetEntity";

export type TipoRequestBodyPet = Omit<PetEntity, "id">;

export type TipoRequestParamsPet = {
  id?: string;
  pet_id?: string;
  id_adotante?: string;
};

export type TipoResponseBodyPet = {
  data?:
    | Pick<PetEntity, "id" | "nome" | "especie" | "porte">
    | Pick<PetEntity, "id" | "nome" | "especie" | "porte">[];
  error?: unknown;
};