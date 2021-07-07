import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // receber o token
  const authToken = request.headers.authorization;

  // validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // validar se token é válido
    const { sub } = verify(
      token,
      "787e3b4df3735b1fa665d08a2d90d973"
    ) as IPayLoad;

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }

  // recuperar informações do usuário
}
