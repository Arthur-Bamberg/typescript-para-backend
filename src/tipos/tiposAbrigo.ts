import AbrigoEntity from "../entities/AbrigoEntity";

export type TipoRequestBodyAbrigo = Omit<AbrigoEntity, "id" | "pets">;

export type TipoRequestParamsAbrigo = { id?: string };

export type TipoResponseBodyAbrigo = {
  dados?:
    | Pick<AbrigoEntity, "id" | "nome" | "email" | "celular" | "endereco">
    | Pick<AbrigoEntity, "id" | "nome" | "email" | "celular" | "endereco">[];
};
