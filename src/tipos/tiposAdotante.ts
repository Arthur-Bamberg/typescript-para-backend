import AdotanteEntity from "../entities/AdotanteEntity";

export type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id">;

export type TipoResponseBodyAdotante = {
  data?: Pick<AdotanteEntity, "id" | "nome" | "celular">;
};
