import { prisma } from "../../lib/prisma";
import {
  TPostPayload,
  TPostSearchQuery,
  TUpdatePostPayload,
} from "./post.interface";
import { PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";
import { Result } from "pg";

//create post
const create = async (payload: TPostPayload, userId: string) => {
  const result = await prisma.post.create({
    data: { ...payload, authorId: userId },
  });

  return result;
};

// get all post
const getAll = async (queryPayload: TPostSearchQuery) => {
  const {
    search,
    tags = "[]",
    authorId,
    isFeatured,
    limit,
    page,
    sortBy,
    sortOrder,
    status,
  } = queryPayload;

  const itemPerPage = Number(limit) || 10;
  let pageNumber = Number(page) || 1;
  let skipItem = (pageNumber - 1) * itemPerPage;



  const tagsArray: string[] = tags ? JSON.parse(tags as string) : [];
  
  const featureCheck: boolean = isFeatured
    ? JSON.parse(isFeatured as string)
    : false;

  const andConditions: PostWhereInput[] = [];

  if (search) {
    console.log("search condition is running ", search);
    andConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  if (authorId) {
    console.log("author condition is running ", authorId);
    andConditions.push({
      authorId: authorId,
    });
  }

  if (tagsArray && tagsArray.length > 0) {
    console.log("tags condition is running ", tagsArray);
    andConditions.push({
      tags: {
        hasSome: tagsArray,
      },
    });
  }

  if (isFeatured) {
    console.log("isFeatured condition is running ", isFeatured);
    andConditions.push({
      isFeatured: featureCheck,
    });
  }

  if (status) {
    console.log("status condition is running ", status);
    andConditions.push({
      status: status as PostStatus,
    });
  }

  const posts = await prisma.post.findMany({
    where: {
      AND: andConditions,
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
    },
    orderBy: {
      [sortBy || "created_at"]: sortOrder || "desc",
    },
    take: itemPerPage,
    skip: skipItem,
  });
   const totalPostCount = await prisma.post.count({
        where: {
            AND: andConditions
        }
    })
     return {
        data: posts,
        meta: {
            page: pageNumber,
            limit: itemPerPage,
            total: totalPostCount,
            totalPages: Math.ceil(totalPostCount / itemPerPage)
        }
    }
};

// get post stats
const getStats = async () => {
  const [
    totalPost,
    totalPublishedPost,
    totalDraftPost,
    totalArchivedPost,
    totalComment,
    totalApprovedComment,
    totalRejectComment,
    totalUser,
    totalAdmin,
    totalRegularUser,
    totalViewsAggregate,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({
      where: {
        status: "PUBLISHED",
      },
    }),
    prisma.post.count({
      where: {
        status: "DRAFT",
      },
    }),
    prisma.post.count({
      where: {
        status: "ARCHIVED",
      },
    }),
    prisma.comment.count(),
    prisma.comment.count({
      where: {
        status: "APPROVED",
      },
    }),
    prisma.comment.count({
      where: {
        status: "REJECT",
      },
    }),
    prisma.user.count(),
    prisma.user.count({
      where: {
        role: "ADMIN",
      },
    }),
    prisma.user.count({
      where: {
        role: "USER",
      },
    }),
    prisma.post.aggregate({
      _sum: {
        views: true,
      },
    }),
  ]);

  const totalViews = totalViewsAggregate._sum.views ?? 0;

  return {
    totalPost,
    totalPublishedPost,
    totalDraftPost,
    totalArchivedPost,
    totalComment,
    totalApprovedComment,
    totalRejectComment,
    totalUser,
    totalAdmin,
    totalRegularUser,
    totalViews,
  };
};

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
  const transaction = await prisma.$transaction(async (prisma) => {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        views: { increment: 1 },
      },
    });

    const post = await prisma.post.findUniqueOrThrow({
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

export const postService = {
  getAll,
  getMy,
  getById,
  create,
  update,
  remove,
  getStats,
};
