import { TLogin } from "./auth-interface";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { SignOptions } from "jsonwebtoken";
import { access } from "node:fs";

const loginToDb = async (payload: TLogin) => {
  const { email, password } = payload;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log("Is user register", user);
  if (!user) {
    throw new Error("Email is invalid");
  }

  const checkPassword = bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new Error("Invalid credential");
  }

  const userPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const createAccessToken = jwtUtils.createJwtToken(
    config.jwt_access_secret!,
    config.jwt_access_expires_in!,
    userPayload!,
  );

  console.log("access token",createAccessToken)

  const createRefreshToken = jwtUtils.createJwtToken(
    config.jwt_refresh_secret!,
    config.jwt_refresh_expires_in!,
    userPayload,
  );

  const tokens = {
    accessToken: createAccessToken,
    refreshToken: createRefreshToken,
  };

  return tokens;
};

export const authService = { loginToDb };
