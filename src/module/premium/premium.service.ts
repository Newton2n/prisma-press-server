import { PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { TPostSearchQuery } from "../post/post.interface";

// get all post
const getAllPremiumContent = async (queryPayload: TPostSearchQuery) => {
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

  andConditions.push({
    isPremium: true,
  });
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
            page: page,
            limit: limit,
            total: totalPostCount,
            totalPages: Math.ceil(totalPostCount / itemPerPage)
        }
    }
};


export const premiumServices = {getAllPremiumContent};