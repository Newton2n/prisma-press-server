import { TLogin } from "./auth-interface";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
const loginToDb = async (payload: TLogin) => {
  const { email, password } = payload;

  const isUserRegistered = await prisma.user.findUniqueOrThrow({
    where: {
      email: email,
    },
  });

  const checkPassword = bcrypt.compare(password, isUserRegistered.password);


  if(!checkPassword){
    throw new Error("Invalid credential")
  }


  
};

export const authService = { loginToDb };
