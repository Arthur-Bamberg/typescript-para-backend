import * as yup from "yup";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import e, { Request, Response, NextFunction } from "express";
import { pt } from "yup-locale-pt";
import { tratarErroValidacaoYup } from "../../utils/tratarErroValidacaoYup";
yup.setLocale(pt);

const esquemaBodyAdotante: yup.ObjectSchema<
  Omit<TipoRequestBodyAdotante, "endereco">
> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup
    .string()
    .defined()
    .required()
    .matches(
      /(?:\(?)(\d{2})(?:\)? ?)(9?\d{4})(?:-)?(\d{4})/g,
      "celular inválido",
    ),
  senha: yup
    .string()
    .defined()
    .required()
    .min(6)
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
      "senha inválida",
    ),
  foto: yup.string().optional(),
});

export const middlewareValidadorBodyAdotante = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => tratarErroValidacaoYup(esquemaBodyAdotante, req, res, next);
