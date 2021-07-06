import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";

interface IAutheticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAutheticateRequest) {
    const userRepositories = getCustomRepository(UsersRepositories);

    // Verificar se email existe
    const user = await userRepositories.findOne({ email });

    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // Verificar se senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    // Gerar token
    const token = sign(
      {
        email: user.email,
      },
      "787e3b4df3735b1fa665d08a2d90d973",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
