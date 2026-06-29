import { CommentStatus } from "../../../generated/prisma/enums";
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
    orderBy: {
      created_at: "desc",
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

  return createComment;
};

//Updates the current user’s own comment.
const update = async (commentId: string, content: string, userId: string) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  if (comment.authorId !== userId) {
    throw new Error("Sorry This Comment Is Not Yours");
  }

  const update = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content: content,
    },
  });

  return update;
};

// Deletes the current user’s own comment.
const remove = async (commentId: string, userId: string) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId,
    },
  });

  if (comment.authorId !== userId) {
    throw new Error("Sorry This Comment Is Not Yours");
  }

  const remove = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return remove;
};

//Changes comment moderation status.
const changeStatus = async (status: CommentStatus, commentId: string) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (comment?.status === status) {
    throw new Error(`This comment status already ${status}`);
  }
  const update = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      status: status,
    },
  });
  return update
};

export const commentService = {
  getAllByUserId,
  getById,
  create,
  update,
  remove,
  changeStatus,
};
