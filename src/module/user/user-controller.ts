import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
//register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, profilePhotoUrl, bio } = req.body;

  //   const isUserRegistered = await prisma.user.findUnique({
  //     where: {
  //       email: email,
  //     },
  //   });

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds),
  );

  const createdUser = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  await prisma.profile.create({
    data: {
      profilePhoto: profilePhotoUrl,
      bio: bio,
      userId: createdUser.id,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      email: createdUser.email,
    },
    omit: {
      password: true,
    },
    include: {
      profile: true,
    },
  });

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "user created successful",
    data: {
      user: user,
    },
  });
};
