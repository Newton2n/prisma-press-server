import Jwt, { Secret, SignOptions } from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
interface TJwtPayload {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "AUTHOR";
}

// create jwt token
const createJwtToken = (
  jwtSecret: Secret,
  jwtExpireLimit: string,
  payload: JwtPayload,
) => {
  const token = Jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpireLimit,
  } as SignOptions);
  return token;
};


// verify jwt token
const verifyToken = async (token: string, secretKey: string) => {
  try {
    console.log(token, secretKey);

    const verify = Jwt.verify(token, secretKey);

    console.log("verify user", verify);
    return {
      success: true,
      data: verify as TJwtPayload,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const jwtUtils = { createJwtToken, verifyToken };
