import * as yup from "yup";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import { Request, Response, NextFunction } from "express";
import { pt } from "yup-locale-pt";

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
) => {
  try {
    await esquemaBodyAdotante.validate(req.body, {
      abortEarly: false,
    });

    return next();
  } catch (error) {
    const yupErrors = error as yup.ValidationError;

    const ValidationErrors: Record<string, string> = {};

    yupErrors.inner.forEach((error) => {
      if (error.path) ValidationErrors[error.path] = error.message;
    });

    return res.status(400).json({ erros: ValidationErrors });
  }
};
