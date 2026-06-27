import { TLogin } from "./auth-interface";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { JwtPayload, SignOptions } from "jsonwebtoken";

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

  console.log("access token", createAccessToken);

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

const refreshTokenService = async (refreshToken: string) => {
  const verifyToken = await jwtUtils.verifyToken(
    refreshToken,
    config.jwt_refresh_secret!,
  );

  if (!verifyToken.data) {
    throw new Error(verifyToken.error);
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: verifyToken.data.id,
    },
    omit: {
      password: true,
    },
  });

  if(user.activeStatus === "BLOCKED"){
    throw new Error("Sorry you are blocked contact support")
  }

  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwtUtils.createJwtToken(
    config.jwt_access_secret!,
    config.jwt_access_expires_in!,
    jwtPayload as JwtPayload,
  );

  return {accessToken}
};

export const authService = { loginToDb, refreshTokenService };
