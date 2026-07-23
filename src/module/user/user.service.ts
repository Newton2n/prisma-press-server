import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import { RegisterUserPayload } from "./user.interface";

//register user
const registerUser = async (payload: RegisterUserPayload) => {
  const { name, email, password, profilePhotoUrl, bio } = payload;
  const isUserRegistered = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (isUserRegistered) {
    throw new Error("The email already registered");
  }
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

  return user;
};

//get my profile

const getMyProfile = async (userId: string) => {
  const getProfile = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    omit: { password: true },
    include: {
      profile: true,
    },
  });
  return getProfile;
};

const updateProfile = async (
  userId: string,
  payload: Omit<RegisterUserPayload, "password">,
) => {
  const { email, name, bio, profilePhotoUrl } = payload;

  const updateProfile = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      name: name,
      email: email,
      profile: {
        update: {
          bio: bio,
          profilePhoto: profilePhotoUrl,
        },
      },
    },
    include: {
      profile: true,
    },
    omit :{
      password :true
    }
  });

  return updateProfile;
};

export const userService = {
  registerUser,
  getMyProfile,
  updateProfile,
};
