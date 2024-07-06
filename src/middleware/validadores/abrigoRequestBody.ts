import * as yup from "yup";
import { Request, Response, NextFunction } from "express";
import { pt } from "yup-locale-pt";
import { tratarErroValidacaoYup } from "../../utils/tratarErroValidacaoYup";
import { TipoRequestBodyAbrigo } from "../../tipos/tiposAbrigo";
yup.setLocale(pt);

const esquemaBodyAbrigo: yup.ObjectSchema<
  Omit<TipoRequestBodyAbrigo, "endereco">
> = yup.object({
  nome: yup.string().defined().required(),
  email: yup.string().defined().required().email(),
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
});

export const middlewareValidadorBodyAbrigo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => tratarErroValidacaoYup(esquemaBodyAbrigo, req, res, next);
