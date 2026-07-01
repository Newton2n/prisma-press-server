import { PostStatus } from "../../../generated/prisma/enums";
import { PostWhereInput } from "../../../generated/prisma/models";

export interface TPostPayload {
  title: string;
  content: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status?: PostStatus;
  tag: string[];
}

export interface TUpdatePostPayload {
  title?: string;
  content?: string;
  thumbnail?: string;
  isFeatured?: boolean;
  status?: PostStatus;
  tag?: string[];
}

export interface TPostSearchQuery extends PostWhereInput {
  search?: string;
  // tags?: string[];
  // isFeatured :boolean;
  authorId?: string;
  page?: string;
  limit?: string;
  sortBy?: string,
  sortOrder?: "desc" | "asc";
}
