import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

export const tratarErroValidacaoYup = (
  esquema: yup.Schema<unknown>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    esquema.validateSync(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const errosYup = error as yup.ValidationError;
    const errosDeValidacao: Record<string, string> = {};

    errosYup.inner.forEach((erro) => {
      if (erro.path) errosDeValidacao[erro.path] = erro.message;
    });
    return res.status(400).json({ erros: errosDeValidacao });
  }
};
