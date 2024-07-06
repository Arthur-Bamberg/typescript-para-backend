import { Request, Response, NextFunction } from "express";
import { ManipulaErros } from "../utils/manipulaErros";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";

export const erroMiddleware = (
  err: ManipulaErros,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || EnumHttpStatusCode.INTERNAL_SERVER_ERROR;

  const mensagem = err.statusCode ? err.message : "Erro interno do servidor";

  res.status(statusCode).json({ mensagem });

  return next();
};
