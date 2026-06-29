import { prisma } from "../../lib/prisma";

// get all Lists comments written by a specific author.
const getAllByUserId = async (userId: string) => {
  const allComment = await prisma.comment.findMany({
    where: {
      authorId: userId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return allComment;
};

// get single comment
const getById = async (commentId: string) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true,
        },
      },
    },
  });
  return comment;
};

//create comment
const create = async (content: string, postId: string, authorId: string) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  const createComment = await prisma.comment.create({
    data: {
      content: content,
      authorId: authorId,
      postId: postId,
    },
    
  });

  return createComment
};

//Updates the current user’s own comment.
const update = async () => {};

// Deletes the current user’s own comment.
const remove = async () => {};

//Changes comment moderation status.
const changeStatus = async () => {};

export const commentService = {
  getAllByUserId,
  getById,
  create,
  update,
  remove,
  changeStatus,
};
