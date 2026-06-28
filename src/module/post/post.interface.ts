import { PostStatus } from "../../../generated/prisma/enums"

export interface TPostPayload {
    title :string,
    content :string,
    thumbnail? :string ,
    isFeatured?:boolean,
    status? :PostStatus,
    tag :string[]

}


