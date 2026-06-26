import Jwt, { Secret, SignOptions } from "jsonwebtoken";
interface TJwtPayload {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "BLOCKED";
}

const createJwtToken = (
  jwtSecret: Secret,
  jwtExpireLimit: string,
  payload: TJwtPayload,
) => {
  const token = Jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpireLimit,
  } as SignOptions);
  return token;
};

const verifyToken = async (token: string, secretKey: string) => {
  try {
    console.log(token, secretKey);

    const verify = Jwt.verify(token, secretKey);

    console.log("verify user", verify);
    return verify;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const jwtUtils = { createJwtToken, verifyToken };
