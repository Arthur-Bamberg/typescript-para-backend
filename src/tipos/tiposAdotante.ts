import AdotanteEntity from "../entities/AdotanteEntity";

export type TipoRequestBodyAdotante = Omit<AdotanteEntity, "id" | "pets">;

export type TipoRequestParamsAdotante = { id?: string };

export type TipoResponseBodyAdotante = {
  data?:
    | Pick<AdotanteEntity, "id" | "nome" | "celular">
    | Pick<AdotanteEntity, "id" | "nome" | "celular">[];
  error?: unknown;
};
