import { prisma } from "../../lib/prisma";
import { TPostPayload } from "./post.interface";

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
    include :{
        author :{
            omit :{
                password :true
            }
        }
    }
  });

  return posts;
};

// get post stats
const getStats = async () => {};

// get my post
const getMy = async () => {};

// get post by id
const getById = async () => {};

//update post
const update = async () => {};

// delete post
const remove = async () => {};

export const postService = { getAll, getMy, getById, create, update, remove };
