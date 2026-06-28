import { prisma } from "../../lib/prisma";
import { TPostPayload, TUpdatePostPayload } from "./post.interface";

//create post
const create = async (payload: TPostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: { ...payload, authorId: userId },
  });

  return result;
};

// get all post
const getAll = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: {
          password: true,
        },
      },
    },
  });

  return posts;
};

// get post stats
const getStats = async () => {};

// get my post
const getMy = async (userId: string) => {
  const myPost = await prisma.post.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      created_at: "desc",
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      _count: {
        select: {
          comment: true,
        },
      },
      comment: true,
    },
  });

  return myPost;
};

// get post by id
const getById = async (postId: string) => {
  const transaction = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: {
        id: postId,
      },
      data: {
        views: { increment: 1 },
      },
    });

    const post = await tx.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
        comment: true,
      },
    });
    return post;
  });

  return transaction;
};

//update post
const update = async (
  postId: string,
  userId: string,
  isAdmin: boolean,
  payload: TUpdatePostPayload,
) => {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && userId !== post.authorId) {
    throw new Error("Sorry This Post Is Not Yours");
  }

  const update = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      ...payload,
    },
    include: {
      author: {
        omit: {
          password: true,
        },
      },
      comment: true,
    },
  });

  return update;
};

// delete post
const remove = async (postId: string, userId: string, isAdmin: boolean) => {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: postId,
    },
  });

  if (!isAdmin && userId !== post.authorId) {
    throw new Error("Sorry This Post Is Not Yours");
  }

  const deleteFromDb = await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  console.log("delete post result ", deleteFromDb);

  return deleteFromDb;
};

export const postService = { getAll, getMy, getById, create, update, remove };
