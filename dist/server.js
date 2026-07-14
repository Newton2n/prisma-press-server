

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  

// src/app.ts
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

// src/config/index.ts
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config_default = {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT || 5e3,
  app_url: process.env.APP_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  stripe_product_price_id: process.env.STRIPE_PRODUCT_PRICE_KEY,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET
};

// src/module/auth/auth.route.ts
import { Router } from "express";

// src/utils/catch-async.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
};

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.8.0",
  "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
  "activeProvider": "postgresql",
  "inlineSchema": 'model Comment {\n  id         String         @id @default(uuid())\n  content    String         @db.Text\n  authorId   String\n  postId     String\n  status     CommentStatus? @default(APPROVED)\n  created_at DateTime       @default(now())\n  updated_at DateTime       @updatedAt\n\n  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)\n  post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)\n\n  @@index([authorId])\n  @@index([postId])\n  @@map("comments")\n}\n\nenum ActiveStatus {\n  ACTIVE\n  INACTIVE\n  BLOCKED\n}\n\nenum Role {\n  USER\n  ADMIN\n  AUTHOR\n}\n\nenum PostStatus {\n  DRAFT\n  PUBLISHED\n  ARCHIVED\n}\n\nenum CommentStatus {\n  APPROVED\n  REJECT\n}\n\nenum SubscriptionStatus {\n  ACTIVE\n  CANCELED\n  EXPIRED\n}\n\nmodel Post {\n  id         String      @id @default(uuid())\n  title      String      @db.VarChar(255)\n  content    String      @db.Text\n  thumbnail  String?\n  isFeatured Boolean?    @default(false)\n  status     PostStatus? @default(PUBLISHED)\n  authorId   String\n  comment    Comment[]\n  tags       String[]\n  views      Int         @default(0)\n  created_at DateTime    @default(now())\n  updated_at DateTime    @updatedAt\n  isPremium  Boolean     @default(false)\n\n  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)\n\n  @@index([authorId])\n  @@map("posts")\n}\n\nmodel Profile {\n  id           String  @id @default(uuid())\n  profilePhoto String?\n  bio          String?\n\n  userId String @unique\n  user   User?  @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime  @default(now())\n  updatedAt DateTime? @updatedAt\n\n  @@map("profiles")\n}\n\n// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Subscription {\n  id               String             @id @default(uuid())\n  userId           String             @unique\n  user             User               @relation(fields: [userId], references: [id], onDelete: Cascade)\n  currentPeriodEnd DateTime\n  status           SubscriptionStatus @default(ACTIVE)\n  stripeCustomerId String             @unique\n  subscriptionId   String             @unique\n  createdAt        DateTime           @default(now())\n  updatedAt        DateTime           @updatedAt\n\n  @@map("subscription")\n}\n\nmodel User {\n  id           String       @id @default(uuid())\n  name         String       @db.VarChar(200)\n  email        String       @unique @db.VarChar(200)\n  password     String       @db.Text()\n  activeStatus ActiveStatus @default(ACTIVE)\n  role         Role         @default(USER)\n  createdAt    DateTime     @default(now())\n  updatedAt    DateTime     @updatedAt\n\n  profile      Profile?\n  post         Post[]\n  comment      Comment[]\n  subscription Subscription?\n\n  @@map("users")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Comment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"postId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"CommentStatus"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"author","kind":"object","type":"User","relationName":"CommentToUser"},{"name":"post","kind":"object","type":"Post","relationName":"CommentToPost"}],"dbName":"comments"},"Post":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"thumbnail","kind":"scalar","type":"String"},{"name":"isFeatured","kind":"scalar","type":"Boolean"},{"name":"status","kind":"enum","type":"PostStatus"},{"name":"authorId","kind":"scalar","type":"String"},{"name":"comment","kind":"object","type":"Comment","relationName":"CommentToPost"},{"name":"tags","kind":"scalar","type":"String"},{"name":"views","kind":"scalar","type":"Int"},{"name":"created_at","kind":"scalar","type":"DateTime"},{"name":"updated_at","kind":"scalar","type":"DateTime"},{"name":"isPremium","kind":"scalar","type":"Boolean"},{"name":"author","kind":"object","type":"User","relationName":"PostToUser"}],"dbName":"posts"},"Profile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"profilePhoto","kind":"scalar","type":"String"},{"name":"bio","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"ProfileToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"profiles"},"Subscription":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SubscriptionToUser"},{"name":"currentPeriodEnd","kind":"scalar","type":"DateTime"},{"name":"status","kind":"enum","type":"SubscriptionStatus"},{"name":"stripeCustomerId","kind":"scalar","type":"String"},{"name":"subscriptionId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"subscription"},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"activeStatus","kind":"enum","type":"ActiveStatus"},{"name":"role","kind":"enum","type":"Role"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"profile","kind":"object","type":"Profile","relationName":"ProfileToUser"},{"name":"post","kind":"object","type":"Post","relationName":"PostToUser"},{"name":"comment","kind":"object","type":"Comment","relationName":"CommentToUser"},{"name":"subscription","kind":"object","type":"Subscription","relationName":"SubscriptionToUser"}],"dbName":"users"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","user","profile","orderBy","cursor","comment","author","_count","post","subscription","Comment.findUnique","Comment.findUniqueOrThrow","Comment.findFirst","Comment.findFirstOrThrow","Comment.findMany","data","Comment.createOne","Comment.createMany","Comment.createManyAndReturn","Comment.updateOne","Comment.updateMany","Comment.updateManyAndReturn","create","update","Comment.upsertOne","Comment.deleteOne","Comment.deleteMany","having","_min","_max","Comment.groupBy","Comment.aggregate","Post.findUnique","Post.findUniqueOrThrow","Post.findFirst","Post.findFirstOrThrow","Post.findMany","Post.createOne","Post.createMany","Post.createManyAndReturn","Post.updateOne","Post.updateMany","Post.updateManyAndReturn","Post.upsertOne","Post.deleteOne","Post.deleteMany","_avg","_sum","Post.groupBy","Post.aggregate","Profile.findUnique","Profile.findUniqueOrThrow","Profile.findFirst","Profile.findFirstOrThrow","Profile.findMany","Profile.createOne","Profile.createMany","Profile.createManyAndReturn","Profile.updateOne","Profile.updateMany","Profile.updateManyAndReturn","Profile.upsertOne","Profile.deleteOne","Profile.deleteMany","Profile.groupBy","Profile.aggregate","Subscription.findUnique","Subscription.findUniqueOrThrow","Subscription.findFirst","Subscription.findFirstOrThrow","Subscription.findMany","Subscription.createOne","Subscription.createMany","Subscription.createManyAndReturn","Subscription.updateOne","Subscription.updateMany","Subscription.updateManyAndReturn","Subscription.upsertOne","Subscription.deleteOne","Subscription.deleteMany","Subscription.groupBy","Subscription.aggregate","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","User.upsertOne","User.deleteOne","User.deleteMany","User.groupBy","User.aggregate","AND","OR","NOT","id","name","email","password","ActiveStatus","activeStatus","Role","role","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","every","some","none","userId","currentPeriodEnd","SubscriptionStatus","status","stripeCustomerId","subscriptionId","profilePhoto","bio","title","content","thumbnail","isFeatured","PostStatus","authorId","tags","views","created_at","updated_at","isPremium","has","hasEvery","hasSome","postId","CommentStatus","is","isNot","connectOrCreate","upsert","disconnect","delete","connect","createMany","set","updateMany","deleteMany","increment","decrement","multiply","divide","push"]'),
  graph: "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_ACABAAAAPwAgBAEAAKACACBuAAChAgAggwEAAKECACCEAQAAoQIAIAMAAAADACADAABCADAEAAA_ACADAAAAAwAgAwAAQgAwBAAAPwAgAwAAAAMAIAMAAEIAMAQAAD8AIAcBAACmAgAgZQEAAAABbUAAAAABbkAAAAABfQEAAAABgwEBAAAAAYQBAQAAAAEBDwAARgAgBmUBAAAAAW1AAAAAAW5AAAAAAX0BAAAAAYMBAQAAAAGEAQEAAAABAQ8AAEgAMAEPAABIADABAAAABQAgBwEAAKUCACBlAQDQAQAhbUAA0wEAIW5AAJICACF9AQDQAQAhgwEBAPcBACGEAQEA9wEAIQIAAAA_ACAPAABMACAGZQEA0AEAIW1AANMBACFuQACSAgAhfQEA0AEAIYMBAQD3AQAhhAEBAPcBACECAAAAAwAgDwAATgAgAgAAAAMAIA8AAE4AIAEAAAAFACADAAAAPwAgFgAARgAgFwAATAAgAQAAAD8AIAEAAAADACAGBwAAogIAIBwAAKQCACAdAACjAgAgbgAAoQIAIIMBAAChAgAghAEAAKECACAJYgAApwEAMGMAAFYAEGQAAKcBADBlAQCKAQAhbUAAjQEAIW5AAKkBACF9AQCKAQAhgwEBAKgBACGEAQEAqAEAIQMAAAADACADAABVADAbAABWACADAAAAAwAgAwAAQgAwBAAAPwAgDAEAAKYBACBiAACkAQAwYwAAEAAQZAAApAEAMGUBAAAAAW1AAJsBACFuQACbAQAhfQEAAAABfkAAmwEAIYABAAClAYABIoEBAQAAAAGCAQEAAAABAQAAAFkAIAEAAABZACABAQAAoAIAIAMAAAAQACADAABcADAEAABZACADAAAAEAAgAwAAXAAwBAAAWQAgAwAAABAAIAMAAFwAMAQAAFkAIAkBAACfAgAgZQEAAAABbUAAAAABbkAAAAABfQEAAAABfkAAAAABgAEAAACAAQKBAQEAAAABggEBAAAAAQEPAABgACAIZQEAAAABbUAAAAABbkAAAAABfQEAAAABfkAAAAABgAEAAACAAQKBAQEAAAABggEBAAAAAQEPAABiADABDwAAYgAwCQEAAJ4CACBlAQDQAQAhbUAA0wEAIW5AANMBACF9AQDQAQAhfkAA0wEAIYABAADdAYABIoEBAQDQAQAhggEBANABACECAAAAWQAgDwAAZQAgCGUBANABACFtQADTAQAhbkAA0wEAIX0BANABACF-QADTAQAhgAEAAN0BgAEigQEBANABACGCAQEA0AEAIQIAAAAQACAPAABnACACAAAAEAAgDwAAZwAgAwAAAFkAIBYAAGAAIBcAAGUAIAEAAABZACABAAAAEAAgAwcAAJsCACAcAACdAgAgHQAAnAIAIAtiAACgAQAwYwAAbgAQZAAAoAEAMGUBAIoBACFtQACNAQAhbkAAjQEAIX0BAIoBACF-QACNAQAhgAEAAKEBgAEigQEBAIoBACGCAQEAigEAIQMAAAAQACADAABtADAbAABuACADAAAAEAAgAwAAXAAwBAAAWQAgDwIAAJwBACAFAACeAQAgCAAAnQEAIAkAAJ8BACBiAACXAQAwYwAABQAQZAAAlwEAMGUBAAAAAWYBAJgBACFnAQAAAAFoAQCYAQAhagAAmQFqImwAAJoBbCJtQACbAQAhbkAAmwEAIQEAAABxACABAAAAcQAgBAIAAJcCACAFAACZAgAgCAAAmAIAIAkAAJoCACADAAAABQAgAwAAdAAwBAAAcQAgAwAAAAUAIAMAAHQAMAQAAHEAIAMAAAAFACADAAB0ADAEAABxACAMAgAAkwIAIAUAAJUCACAIAACUAgAgCQAAlgIAIGUBAAAAAWYBAAAAAWcBAAAAAWgBAAAAAWoAAABqAmwAAABsAm1AAAAAAW5AAAAAAQEPAAB4ACAIZQEAAAABZgEAAAABZwEAAAABaAEAAAABagAAAGoCbAAAAGwCbUAAAAABbkAAAAABAQ8AAHoAMAEPAAB6ADAMAgAA1AEAIAUAANYBACAIAADVAQAgCQAA1wEAIGUBANABACFmAQDQAQAhZwEA0AEAIWgBANABACFqAADRAWoibAAA0gFsIm1AANMBACFuQADTAQAhAgAAAHEAIA8AAH0AIAhlAQDQAQAhZgEA0AEAIWcBANABACFoAQDQAQAhagAA0QFqImwAANIBbCJtQADTAQAhbkAA0wEAIQIAAAAFACAPAAB_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_QEAIAEPAADHAgAwEQUAAJ4BACAGAACmAQAgYgAAyAEAMGMAAAcAEGQAAMgBADBlAQAAAAGAAQAAygGKASOFAQEAmAEAIYYBAQCYAQAhhwEBALABACGIASAAyQEAIYoBAQCYAQAhiwEAALYBACCMAQIAywEAIY0BQACbAQAhjgFAAJsBACGPASAAzAEAIQIAAAAJACAPAAD9AQAgAgAAAPUBACAPAAD2AQAgD2IAAPQBADBjAAD1AQAQZAAA9AEAMGUBAJgBACGAAQAAygGKASOFAQEAmAEAIYYBAQCYAQAhhwEBALABACGIASAAyQEAIYoBAQCYAQAhiwEAALYBACCMAQIAywEAIY0BQACbAQAhjgFAAJsBACGPASAAzAEAIQ9iAAD0AQAwYwAA9QEAEGQAAPQBADBlAQCYAQAhgAEAAMoBigEjhQEBAJgBACGGAQEAmAEAIYcBAQCwAQAhiAEgAMkBACGKAQEAmAEAIYsBAAC2AQAgjAECAMsBACGNAUAAmwEAIY4BQACbAQAhjwEgAMwBACELZQEA0AEAIYABAAD5AYoBI4UBAQDQAQAhhgEBANABACGHAQEA9wEAIYgBIAD4AQAhiwEAAPoBACCMAQIA-wEAIY0BQADTAQAhjgFAANMBACGPASAA_AEAIQGdAQEAAAABAZ0BIAAAAAEBnQEAAACKAQMCnQEBAAAABKQBAQAAAAUFnQECAAAAAaABAgAAAAGhAQIAAAABogECAAAAAaMBAgAAAAEBnQEgAAAAAQwFAAD-AQAgZQEA0AEAIYABAAD5AYoBI4UBAQDQAQAhhgEBANABACGHAQEA9wEAIYgBIAD4AQAhiwEAAPoBACCMAQIA-wEAIY0BQADTAQAhjgFAANMBACGPASAA_AEAIQsWAAD_AQAwFwAAgwIAMJcBAACAAgAwmAEAAIECADCZAQAA4gEAMJoBAADiAQAwmwEAAOIBADCcAQAAggIAIJ0BAADiAQAwngEAAIQCADCfAQAA5QEAMAcGAACJAgAgZQEAAAABgAEAAACVAQOGAQEAAAABigEBAAAAAY0BQAAAAAGOAUAAAAABAgAAAAEAIBYAAIgCACADAAAAAQAgFgAAiAIAIBcAAIYCACABDwAAxgIAMAIAAAABACAPAACGAgAgAgAAAOYBACAPAACFAgAgBmUBANABACGAAQAA6AGVASOGAQEA0AEAIYoBAQDQAQAhjQFAANMBACGOAUAA0wEAIQcGAACHAgAgZQEA0AEAIYABAADoAZUBI4YBAQDQAQAhigEBANABACGNAUAA0wEAIY4BQADTAQAhBRYAAMECACAXAADEAgAglwEAAMICACCYAQAAwwIAIJsBAABxACAHBgAAiQIAIGUBAAAAAYABAAAAlQEDhgEBAAAAAYoBAQAAAAGNAUAAAAABjgFAAAAAAQMWAADBAgAglwEAAMICACCbAQAAcQAgDAUAAIwCACBlAQAAAAGAAQAAAIoBA4UBAQAAAAGGAQEAAAABhwEBAAAAAYgBIAAAAAGLAQAAiwIAIIwBAgAAAAGNAUAAAAABjgFAAAAAAY8BIAAAAAEBnQEBAAAABAQWAAD_AQAwlwEAAIACADCbAQAA4gEAMJwBAACCAgAgBWUBAAAAAW1AAAAAAW5AAAAAAYMBAQAAAAGEAQEAAAABAgAAAD8AIBYAAI0CACADAAAAAwAgFgAAjQIAIBcAAJECACAHAAAAAwAgDwAAkQIAIGUBANABACFtQADTAQAhbkAAkgIAIYMBAQD3AQAhhAEBAPcBACEFZQEA0AEAIW1AANMBACFuQACSAgAhgwEBAPcBACGEAQEA9wEAIQGdAUAAAAABAxYAAI0CACCXAQAAjgIAIJsBAAA_ACAEFgAA7QEAMJcBAADuAQAwmwEAAPEBADCcAQAA8AEAIAQWAADeAQAwlwEAAN8BADCbAQAA4gEAMJwBAADhAQAgAxYAANgBACCXAQAA2QEAIJsBAABZACAEAQAAoAIAIG4AAKECACCDAQAAoQIAIIQBAAChAgAgAAABAQAAoAIAIAAAAAUWAAC8AgAgFwAAvwIAIJcBAAC9AgAgmAEAAL4CACCbAQAAcQAgAxYAALwCACCXAQAAvQIAIJsBAABxACAEAgAAlwIAIAUAAJkCACAIAACYAgAgCQAAmgIAIAAAAAAHFgAAtwIAIBcAALoCACCXAQAAuAIAIJgBAAC5AgAgmQEAAAUAIJoBAAAFACCbAQAAcQAgAxYAALcCACCXAQAAuAIAIJsBAABxACAAAAAAAAUWAACyAgAgFwAAtQIAIJcBAACzAgAgmAEAALQCACCbAQAAcQAgAxYAALICACCXAQAAswIAIJsBAABxACAAAAAFBQAAmQIAIAYAAKACACCAAQAAoQIAIIcBAAChAgAgiAEAAKECACALAgAAkwIAIAUAAJUCACAJAACWAgAgZQEAAAABZgEAAAABZwEAAAABaAEAAAABagAAAGoCbAAAAGwCbUAAAAABbkAAAAABAgAAAHEAIBYAALICACADAAAABQAgFgAAsgIAIBcAALYCACANAAAABQAgAgAA1AEAIAUAANYBACAJAADXAQAgDwAAtgIAIGUBANABACFmAQDQAQAhZwEA0AEAIWgBANABACFqAADRAWoibAAA0gFsIm1AANMBACFuQADTAQAhCwIAANQBACAFAADWAQAgCQAA1wEAIGUBANABACFmAQDQAQAhZwEA0AEAIWgBANABACFqAADRAWoibAAA0gFsIm1AANMBACFuQADTAQAhCwUAAJUCACAIAACUAgAgCQAAlgIAIGUBAAAAAWYBAAAAAWcBAAAAAWgBAAAAAWoAAABqAmwAAABsAm1AAAAAAW5AAAAAAQIAAABxACAWAAC3AgAgAwAAAAUAIBYAALcCACAXAAC7AgAgDQAAAAUAIAUAANYBACAIAADVAQAgCQAA1wEAIA8AALsCACBlAQDQAQAhZgEA0AEAIWcBANABACFoAQDQAQAhagAA0QFqImwAANIBbCJtQADTAQAhbkAA0wEAIQsFAADWAQAgCAAA1QEAIAkAANcBACBlAQDQAQAhZgEA0AEAIWcBANABACFoAQDQAQAhagAA0QFqImwAANIBbCJtQADTAQAhbkAA0wEAIQsCAACTAgAgBQAAlQIAIAgAAJQCACBlAQAAAAFmAQAAAAFnAQAAAAFoAQAAAAFqAAAAagJsAAAAbAJtQAAAAAFuQAAAAAECAAAAcQAgFgAAvAIAIAMAAAAFACAWAAC8AgAgFwAAwAIAIA0AAAAFACACAADUAQAgBQAA1gEAIAgAANUBACAPAADAAgAgZQEA0AEAIWYBANABACFnAQDQAQAhaAEA0AEAIWoAANEBaiJsAADSAWwibUAA0wEAIW5AANMBACELAgAA1AEAIAUAANYBACAIAADVAQAgZQEA0AEAIWYBANABACFnAQDQAQAhaAEA0AEAIWoAANEBaiJsAADSAWwibUAA0wEAIW5AANMBACELAgAAkwIAIAgAAJQCACAJAACWAgAgZQEAAAABZgEAAAABZwEAAAABaAEAAAABagAAAGoCbAAAAGwCbUAAAAABbkAAAAABAgAAAHEAIBYAAMECACADAAAABQAgFgAAwQIAIBcAAMUCACANAAAABQAgAgAA1AEAIAgAANUBACAJAADXAQAgDwAAxQIAIGUBANABACFmAQDQAQAhZwEA0AEAIWgBANABACFqAADRAWoibAAA0gFsIm1AANMBACFuQADTAQAhCwIAANQBACAIAADVAQAgCQAA1wEAIGUBANABACFmAQDQAQAhZwEA0AEAIWgBANABACFqAADRAWoibAAA0gFsIm1AANMBACFuQADTAQAhBmUBAAAAAYABAAAAlQEDhgEBAAAAAYoBAQAAAAGNAUAAAAABjgFAAAAAAQtlAQAAAAGAAQAAAIoBA4UBAQAAAAGGAQEAAAABhwEBAAAAAYgBIAAAAAGLAQAAiwIAIIwBAgAAAAGNAUAAAAABjgFAAAAAAY8BIAAAAAENBgAArQIAIGUBAAAAAYABAAAAigEDhQEBAAAAAYYBAQAAAAGHAQEAAAABiAEgAAAAAYoBAQAAAAGLAQAAiwIAIIwBAgAAAAGNAUAAAAABjgFAAAAAAY8BIAAAAAECAAAACQAgFgAAyAIAIAMAAAAHACAWAADIAgAgFwAAzAIAIA8AAAAHACAGAACsAgAgDwAAzAIAIGUBANABACGAAQAA-QGKASOFAQEA0AEAIYYBAQDQAQAhhwEBAPcBACGIASAA-AEAIYoBAQDQAQAhiwEAAPoBACCMAQIA-wEAIY0BQADTAQAhjgFAANMBACGPASAA_AEAIQ0GAACsAgAgZQEA0AEAIYABAAD5AYoBI4UBAQDQAQAhhgEBANABACGHAQEA9wEAIYgBIAD4AQAhigEBANABACGLAQAA-gEAIIwBAgD7AQAhjQFAANMBACGOAUAA0wEAIY8BIAD8AQAhBmUBAAAAAYABAAAAlQEDhgEBAAAAAY0BQAAAAAGOAUAAAAABkwEBAAAAAQIGAAIIAAQFAgQDBQ8BBwAHCAoECREGAQEGAgMFDQEGAAIHAAUBBQ4AAQEAAgIFEwAIEgAAAgYAAggABAIGAAIIAAQDBwAMHAANHQAOAAAAAwcADBwADR0ADgEGAAIBBgACBQcAExwAFh0AFy4AFC8AFQAAAAAABQcAExwAFh0AFy4AFC8AFQEBSwIBAVECAwcAHBwAHR0AHgAAAAMHABwcAB0dAB4BAQACAQEAAgMHACMcACQdACUAAAADBwAjHAAkHQAlAAADBwAqHAArHQAsAAAAAwcAKhwAKx0ALAoCAQsUAQwVAQ0WAQ4XARAZAREbCBIcCRMeARQgCBUhChgiARkjARokCB4nCx8oDyApBCEqBCIrBCMsBCQtBCUvBCYxCCcyECg0BCk2CCo3ESs4BCw5BC06CDA9EjE-GDJAAzNBAzRDAzVEAzZFAzdHAzhJCDlKGTpNAztPCDxQGj1SAz5TAz9UCEBXG0FYH0JaBkNbBkRdBkVeBkZfBkdhBkhjCElkIEpmBktoCExpIU1qBk5rBk9sCFBvIlFwJlJyAlNzAlR1AlV2AlZ3Ald5Alh7CFl8J1p-AluAAQhcgQEoXYIBAl6DAQJfhAEIYIcBKWGIAS0"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var Role = {
  USER: "USER",
  ADMIN: "ADMIN",
  AUTHOR: "AUTHOR"
};
var SubscriptionStatus = {
  ACTIVE: "ACTIVE",
  CANCELED: "CANCELED",
  EXPIRED: "EXPIRED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${config_default.database_url}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/module/auth/auth.service.ts
import bcrypt from "bcryptjs";

// src/utils/jwt.ts
import Jwt from "jsonwebtoken";
var createJwtToken = (jwtSecret, jwtExpireLimit, payload) => {
  const token = Jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpireLimit
  });
  return token;
};
var verifyToken = async (token, secretKey) => {
  try {
    console.log(token, secretKey);
    const verify = Jwt.verify(token, secretKey);
    console.log("verify user", verify);
    return {
      success: true,
      data: verify
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
var jwtUtils = { createJwtToken, verifyToken };

// src/module/auth/auth.service.ts
var login = async (payload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  console.log("Is user register", user);
  if (!user) {
    throw new Error("Email is invalid");
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new Error("Invalid credential");
  }
  const userPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const createAccessToken = jwtUtils.createJwtToken(
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in,
    userPayload
  );
  console.log("access token", createAccessToken);
  const createRefreshToken = jwtUtils.createJwtToken(
    config_default.jwt_refresh_secret,
    config_default.jwt_refresh_expires_in,
    userPayload
  );
  const tokens = {
    accessToken: createAccessToken,
    refreshToken: createRefreshToken
  };
  return tokens;
};
var refreshToken = async (refreshToken3) => {
  const verifyToken2 = await jwtUtils.verifyToken(
    refreshToken3,
    config_default.jwt_refresh_secret
  );
  if (!verifyToken2.data) {
    throw new Error(verifyToken2.error);
  }
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: verifyToken2.data.id
    },
    omit: {
      password: true
    }
  });
  if (user.activeStatus === "BLOCKED") {
    throw new Error("Sorry you are blocked contact support");
  }
  const jwtPayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  };
  const accessToken = jwtUtils.createJwtToken(
    config_default.jwt_access_secret,
    config_default.jwt_access_expires_in,
    jwtPayload
  );
  return { accessToken };
};
var authService = { login, refreshToken };

// src/utils/response.ts
var sendSuccessResponse = (res, data) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data?.meta
  });
};

// src/module/auth/auth.controller.ts
import { StatusCodes } from "http-status-codes";
var login2 = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const { refreshToken: refreshToken3, accessToken } = await authService.login(payload);
    res.cookie("refreshToken", refreshToken3, {
      httpOnly: true,
      secure: false,
      sameSite: false,
      maxAge: 1e3 * 60 * 60 * 24 * 7
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24
    });
    sendSuccessResponse(res, {
      success: true,
      statusCode: 200,
      message: "User log in successful",
      data: {
        refreshToken: refreshToken3,
        accessToken
      }
    });
  }
);
var refreshToken2 = catchAsync(
  async (req, res, next) => {
    const { refreshToken: refreshToken3 } = req.cookies;
    if (!refreshToken3) {
      throw new Error(
        "You are not logged in. Please log in to access this resource."
      );
    }
    const { accessToken } = await authService.refreshToken(refreshToken3);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 1e3 * 60 * 60 * 24
    });
    sendSuccessResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Access token created",
      data: { accessToken }
    });
  }
);
var authController = { login: login2, refreshToken: refreshToken2 };

// src/module/auth/auth.route.ts
var authRouter = Router();
authRouter.post("/login", authController.login);
authRouter.post("/refresh-token", authController.refreshToken);
var auth_route_default = authRouter;

// src/module/user/user.route.ts
import { Router as Router2 } from "express";

// src/module/user/user.controller.ts
import { StatusCodes as StatusCodes2 } from "http-status-codes";

// src/module/user/user.service.ts
import bcrypt2 from "bcryptjs";
var registerUser = async (payload) => {
  const { name, email, password, profilePhotoUrl, bio } = payload;
  const isUserRegistered = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (isUserRegistered) {
    throw new Error("The email already registered");
  }
  const hashedPassword = await bcrypt2.hash(
    password,
    Number(config_default.bcrypt_salt_rounds)
  );
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
  await prisma.profile.create({
    data: {
      profilePhoto: profilePhotoUrl,
      bio,
      userId: createdUser.id
    }
  });
  const user = await prisma.user.findUnique({
    where: {
      email: createdUser.email
    },
    omit: {
      password: true
    },
    include: {
      profile: true
    }
  });
  return user;
};
var getMyProfile = async (userId) => {
  const getProfile = await prisma.user.findUnique({
    where: {
      id: userId
    },
    omit: { password: true },
    include: {
      profile: true
    }
  });
  return getProfile;
};
var updateProfile = async (userId, payload) => {
  const { email, name, bio, profilePhotoUrl } = payload;
  const updateProfile3 = await prisma.user.update({
    where: {
      id: userId
    },
    data: {
      name,
      email,
      profile: {
        update: {
          bio,
          profilePhoto: profilePhotoUrl
        }
      }
    },
    include: {
      profile: true
    },
    omit: {
      password: true
    }
  });
  return updateProfile3;
};
var userService = {
  registerUser,
  getMyProfile,
  updateProfile
};

// src/module/user/user.controller.ts
var register = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    console.log("request body", req.body);
    const result = await userService.registerUser(payload);
    sendSuccessResponse(res, {
      success: true,
      message: "User created successful",
      statusCode: StatusCodes2.CREATED,
      data: result
    });
  }
);
var getMyProfile2 = catchAsync(
  async (req, res, next) => {
    if (!req.user) {
      throw new Error("Verification failed please log in again");
    }
    console.log("request body", req.body);
    const result = await userService.getMyProfile(req.user?.id);
    sendSuccessResponse(res, {
      statusCode: 200,
      success: true,
      message: "user get successful",
      data: result
    });
  }
);
var updateProfile2 = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    const payload = req.body;
    if (!userId) {
      throw new Error("Verification failed please log in again");
    }
    console.log("request body", req.body);
    const updateProfile3 = await userService.updateProfile(userId, payload);
    sendSuccessResponse(res, {
      statusCode: StatusCodes2.OK,
      success: true,
      message: "User updated successful",
      data: updateProfile3
    });
  }
);
var userController = {
  register,
  getMyProfile: getMyProfile2,
  updateProfile: updateProfile2
};

// src/middleware/auth.ts
var auth = (...requiredRoles) => {
  return catchAsync(async (req, res, next) => {
    const accessToken = req.cookies.accessToken ? req.cookies.accessToken : req.headers.authorization?.startsWith("Bearer") ? req.headers.authorization.split(" ")[1] : req.headers.authorization;
    if (!accessToken) {
      throw new Error(
        "You are not logged in. Please log in to access this resource."
      );
    }
    const verifyAccessToken = await jwtUtils.verifyToken(
      accessToken,
      config_default.jwt_access_secret
    );
    if (!verifyAccessToken.success) {
      throw new Error(verifyAccessToken.error);
    }
    const { email, name, id, role } = verifyAccessToken.data;
    console.log(email, name, id, role);
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new Error(
        "Forbidden. You don't have permission to access this resource."
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
        email,
        role
      }
    });
    if (!user) {
      throw new Error("User not found. Please log in in again.");
    }
    if (user.activeStatus === "BLOCKED") {
      throw new Error("Your account has been blocked. Please contact support.");
    }
    req.user = {
      id,
      name,
      email,
      role
    };
    next();
  });
};
var authMiddleware = { auth };

// src/module/user/user.route.ts
var userRouter = Router2();
userRouter.post("/register", userController.register);
userRouter.get(
  "/me",
  authMiddleware.auth(Role.AUTHOR, Role.USER, Role.ADMIN),
  userController.getMyProfile
);
userRouter.put(
  "/my-profile",
  authMiddleware.auth(Role.AUTHOR, Role.USER, Role.ADMIN),
  userController.updateProfile
);
var user_route_default = userRouter;

// src/module/post/post.route.ts
import { Router as Router3 } from "express";

// src/module/post/post.service.ts
var create = async (payload, userId) => {
  const result = await prisma.post.create({
    data: { ...payload, authorId: userId }
  });
  return result;
};
var getAll = async (queryPayload) => {
  const {
    search,
    tags = "[]",
    authorId,
    isFeatured,
    limit,
    page,
    sortBy,
    sortOrder,
    status
  } = queryPayload;
  const itemPerPage = Number(limit) || 10;
  let pageNumber = Number(page) || 1;
  let skipItem = (pageNumber - 1) * itemPerPage;
  const tagsArray = tags ? JSON.parse(tags) : [];
  const featureCheck = isFeatured ? JSON.parse(isFeatured) : false;
  const andConditions = [];
  if (search) {
    console.log("search condition is running ", search);
    andConditions.push({
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          content: {
            contains: search,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (authorId) {
    console.log("author condition is running ", authorId);
    andConditions.push({
      authorId
    });
  }
  if (tagsArray && tagsArray.length > 0) {
    console.log("tags condition is running ", tagsArray);
    andConditions.push({
      tags: {
        hasSome: tagsArray
      }
    });
  }
  if (isFeatured) {
    console.log("isFeatured condition is running ", isFeatured);
    andConditions.push({
      isFeatured: featureCheck
    });
  }
  if (status) {
    console.log("status condition is running ", status);
    andConditions.push({
      status
    });
  }
  const posts = await prisma.post.findMany({
    where: {
      AND: andConditions
    },
    include: {
      author: {
        omit: {
          password: true
        }
      },
      _count: {
        select: {
          comment: true
        }
      }
    },
    orderBy: {
      [sortBy || "created_at"]: sortOrder || "desc"
    },
    take: itemPerPage,
    skip: skipItem
  });
  return posts;
};
var getStats = async () => {
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
    totalViewsAggregate
  ] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({
      where: {
        status: "PUBLISHED"
      }
    }),
    prisma.post.count({
      where: {
        status: "DRAFT"
      }
    }),
    prisma.post.count({
      where: {
        status: "ARCHIVED"
      }
    }),
    prisma.comment.count(),
    prisma.comment.count({
      where: {
        status: "APPROVED"
      }
    }),
    prisma.comment.count({
      where: {
        status: "REJECT"
      }
    }),
    prisma.user.count(),
    prisma.user.count({
      where: {
        role: "ADMIN"
      }
    }),
    prisma.user.count({
      where: {
        role: "USER"
      }
    }),
    prisma.post.aggregate({
      _sum: {
        views: true
      }
    })
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
    totalViews
  };
};
var getMy = async (userId) => {
  const myPost = await prisma.post.findMany({
    where: {
      authorId: userId
    },
    orderBy: {
      created_at: "desc"
    },
    include: {
      author: {
        omit: {
          password: true
        }
      },
      _count: {
        select: {
          comment: true
        }
      },
      comment: true
    }
  });
  return myPost;
};
var getById = async (postId) => {
  const transaction = await prisma.$transaction(async (prisma2) => {
    await prisma2.post.update({
      where: {
        id: postId
      },
      data: {
        views: { increment: 1 }
      }
    });
    const post = await prisma2.post.findUniqueOrThrow({
      where: {
        id: postId
      },
      include: {
        author: {
          omit: {
            password: true
          }
        },
        comment: true
      }
    });
    return post;
  });
  return transaction;
};
var update = async (postId, userId, isAdmin, payload) => {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: postId
    }
  });
  if (!isAdmin && userId !== post.authorId) {
    throw new Error("Sorry This Post Is Not Yours");
  }
  const update5 = await prisma.post.update({
    where: {
      id: postId
    },
    data: {
      ...payload
    },
    include: {
      author: {
        omit: {
          password: true
        }
      },
      comment: true
    }
  });
  return update5;
};
var remove = async (postId, userId, isAdmin) => {
  const post = await prisma.post.findFirstOrThrow({
    where: {
      id: postId
    }
  });
  if (!isAdmin && userId !== post.authorId) {
    throw new Error("Sorry This Post Is Not Yours");
  }
  const deleteFromDb = await prisma.post.delete({
    where: {
      id: postId
    }
  });
  console.log("delete post result ", deleteFromDb);
  return deleteFromDb;
};
var postService = {
  getAll,
  getMy,
  getById,
  create,
  update,
  remove,
  getStats
};

// src/module/post/post.controller.ts
import { StatusCodes as StatusCodes3 } from "http-status-codes";
var create2 = catchAsync(
  async (req, res, next) => {
    const payload = req.body;
    const userId = req.user?.id;
    const result = await postService.create(payload, userId);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes3.CREATED,
      message: "Post Created Successfully",
      data: result
    });
  }
);
var update2 = catchAsync(
  async (req, res, next) => {
    const { postId } = req.params;
    const payload = req.body;
    const userId = req.user?.id;
    if (!postId || !payload || !userId) {
      throw new Error("All fields are require");
    }
    const isAdmin = req.user?.role === "ADMIN";
    const result = await postService.update(
      postId,
      userId,
      isAdmin,
      payload
    );
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes3.OK,
      message: "Post Updated Successfully",
      data: result
    });
  }
);
var getAll2 = catchAsync(
  async (req, res, next) => {
    console.log("raw query", req.url);
    console.log("Query param", req.query);
    const result = await postService.getAll(req.query);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes3.OK,
      message: "Post Retrieved Successfully",
      data: result
    });
  }
);
var getStats2 = catchAsync(
  async (req, res, next) => {
    const result = await postService.getStats();
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes3.OK,
      message: "Total Stats retrieved successfully",
      data: result
    });
  }
);
var getMy2 = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    const result = await postService.getMy(userId);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes3.OK,
      message: "Post Retrieved Successfully",
      data: result
    });
  }
);
var getById2 = catchAsync(
  async (req, res, next) => {
    const { postId } = req.params;
    if (!postId) {
      throw new Error("Post id Required");
    }
    const result = await postService.getById(postId);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes3.OK,
      message: "Post Retrieved Successfully",
      data: result
    });
  }
);
var remove2 = catchAsync(
  async (req, res, next) => {
    const { postId } = req.params;
    const userId = req.user?.id;
    if (!postId || !userId) {
      throw new Error("All fields are require");
    }
    const isAdmin = req.user?.role === "ADMIN";
    const result = await postService.remove(postId, userId, isAdmin);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes3.OK,
      message: "Post Deleted Successfully",
      data: result
    });
  }
);
var postController = {
  getAll: getAll2,
  getStats: getStats2,
  getMy: getMy2,
  getById: getById2,
  create: create2,
  update: update2,
  remove: remove2
};

// src/module/post/post.route.ts
var postRouter = Router3();
postRouter.get("/", postController.getAll);
postRouter.get(
  "/stats",
  authMiddleware.auth(Role.ADMIN),
  postController.getStats
);
postRouter.get(
  "/my-posts",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.getMy
);
postRouter.get("/:postId", postController.getById);
postRouter.post(
  "/",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.create
);
postRouter.patch(
  "/:postId",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.update
);
postRouter.delete(
  "/:postId",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  postController.remove
);
var post_route_default = postRouter;

// src/module/comment/comment.route.ts
import { Router as Router4 } from "express";

// src/module/comment/comment.service.ts
var getAllByUserId = async (userId) => {
  const allComment = await prisma.comment.findMany({
    where: {
      authorId: userId
    },
    include: {
      post: {
        select: {
          id: true,
          title: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  });
  return allComment;
};
var getById3 = async (commentId) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId
    },
    include: {
      post: {
        select: {
          id: true,
          title: true,
          views: true
        }
      }
    }
  });
  return comment;
};
var create3 = async (content, postId, authorId) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: postId
    }
  });
  const createComment = await prisma.comment.create({
    data: {
      content,
      authorId,
      postId
    }
  });
  return createComment;
};
var update3 = async (commentId, content, userId) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId
    }
  });
  if (comment.authorId !== userId) {
    throw new Error("Sorry This Comment Is Not Yours");
  }
  const update5 = await prisma.comment.update({
    where: {
      id: commentId
    },
    data: {
      content
    }
  });
  return update5;
};
var remove3 = async (commentId, userId) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId
    }
  });
  if (comment.authorId !== userId) {
    throw new Error("Sorry This Comment Is Not Yours");
  }
  const remove5 = await prisma.comment.delete({
    where: {
      id: commentId
    }
  });
  return remove5;
};
var changeStatus = async (status, commentId) => {
  const comment = await prisma.comment.findUniqueOrThrow({
    where: {
      id: commentId
    }
  });
  if (comment?.status === status) {
    throw new Error(`This comment status already ${status}`);
  }
  const update5 = await prisma.comment.update({
    where: {
      id: commentId
    },
    data: {
      status
    }
  });
  return update5;
};
var commentService = {
  getAllByUserId,
  getById: getById3,
  create: create3,
  update: update3,
  remove: remove3,
  changeStatus
};

// src/module/comment/comment.controller.ts
import { StatusCodes as StatusCodes4 } from "http-status-codes";
var getAllByUserId2 = catchAsync(
  async (req, res, next) => {
    const { authorId } = req.params;
    if (!authorId) {
      throw new Error("User Id Needed Please Login");
    }
    const result = await commentService.getAllByUserId(authorId);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes4.OK,
      message: "All comment Retrieved successfully",
      data: {
        result
      }
    });
  }
);
var getById4 = catchAsync(
  async (req, res, next) => {
    const { commentId } = req.params;
    if (!commentId) {
      throw new Error("Comment Id required");
    }
    const result = await commentService.getById(commentId);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes4.OK,
      message: "Comment Retrieved successfully",
      data: {
        result
      }
    });
  }
);
var create4 = catchAsync(
  async (req, res, next) => {
    const { content, postId } = req.body;
    const authorId = req.user?.id;
    if (!content || !postId || !authorId) {
      throw new Error("All Fields Are Required");
    }
    const comment = await commentService.create(content, postId, authorId);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes4.OK,
      message: "Comment Created successfully",
      data: {
        comment
      }
    });
  }
);
var update4 = catchAsync(
  async (req, res, next) => {
    const { commentId } = req.params;
    const userId = req.user?.id;
    const { content } = req.body;
    if (!commentId || !userId || !content) {
      throw new Error("All Fields Are Required");
    }
    const result = await commentService.update(
      commentId,
      content,
      userId
    );
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes4.OK,
      message: "Comment updated successfully",
      data: {
        result
      }
    });
  }
);
var remove4 = catchAsync(
  async (req, res, next) => {
    const { commentId } = req.params;
    const userId = req.user?.id;
    if (!commentId || !userId) {
      throw new Error("All Fields Are Required");
    }
    const result = await commentService.remove(commentId, userId);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes4.OK,
      message: "Comment deleted successfully",
      data: {
        result
      }
    });
  }
);
var changeStatus2 = catchAsync(
  async (req, res, next) => {
    const { status } = req.body;
    const { commentId } = req.params;
    if (!status || !commentId) {
      throw new Error("All Fields Are Required");
    }
    if (!["APPROVED", "REJECT"].includes(status)) {
      throw new Error("Invalid Comment Status");
    }
    const updateStatus = await commentService.changeStatus(
      status,
      commentId
    );
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes4.OK,
      message: "Comment Status updated successfully",
      data: {
        updateStatus
      }
    });
  }
);
var commentController = {
  getAllByUserId: getAllByUserId2,
  getById: getById4,
  create: create4,
  update: update4,
  remove: remove4,
  changeStatus: changeStatus2
};

// src/module/comment/comment.route.ts
var commentRouter = Router4();
commentRouter.get("/author/:authorId", commentController.getAllByUserId);
commentRouter.get("/:commentId", commentController.getById);
commentRouter.post(
  "/",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentController.create
);
commentRouter.patch(
  "/:commentId",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentController.update
);
commentRouter.delete(
  "/:commentId",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentController.remove
);
commentRouter.patch(
  "/:commentId/moderate",
  authMiddleware.auth(Role.ADMIN),
  commentController.changeStatus
);
var comment_route_default = commentRouter;

// src/middleware/not-found.ts
var notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    status: 404,
    error: "Not Found",
    requestType: req.method,
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
    time: /* @__PURE__ */ new Date()
  });
};
var not_found_default = notFound;

// src/middleware/global-error.ts
import { StatusCodes as StatusCodes5 } from "http-status-codes";
var globalError = (error, req, res, next) => {
  res.status(StatusCodes5.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || "Something went wrong ",
    StatusCode: StatusCodes5.INTERNAL_SERVER_ERROR,
    error: error.stack
  });
};
var global_error_default = globalError;

// src/module/subscription/subscription.route.ts
import { Router as Router5 } from "express";

// src/lib/stripe.ts
import Stripe from "stripe";
var stripe = new Stripe(config_default.stripe_secret_key);

// src/module/subscription/subscription.utils.ts
var getCurrentPeriodEnd = async (subscriptionData) => {
  console.log(subscriptionData);
  const subscriptionEndInSeconds = subscriptionData.items?.data[0]?.current_period_end;
  console.log("subscriptions end in second", subscriptionEndInSeconds);
  const subscriptionEndInDate = new Date(subscriptionEndInSeconds * 1e3);
  return subscriptionEndInDate;
};
var handleCheckoutComplete = async (session) => {
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer;
  const stripeSubscriptionId = session.subscription;
  const stripeSubscription = await stripe.subscriptions.retrieve(
    stripeSubscriptionId
  );
  const currentPeriodEnd = await getCurrentPeriodEnd(stripeSubscription);
  await prisma.subscription.upsert({
    where: {
      userId
    },
    create: {
      userId,
      stripeCustomerId,
      subscriptionId: stripeSubscriptionId,
      currentPeriodEnd,
      status: "ACTIVE"
    },
    update: {
      stripeCustomerId,
      subscriptionId: stripeSubscriptionId,
      currentPeriodEnd,
      status: "ACTIVE"
    }
  });
  console.log("subscription end in", currentPeriodEnd);
  console.log("stripe subscription details", stripeSubscription.items.data);
  console.log("session", stripeCustomerId, stripeSubscriptionId);
};
var handleSubscriptionChange = async (subscription) => {
  console.log("subscription id in handleSubscriptionCHange", subscription);
  const subscriptionId = subscription.id;
  const status = subscription.status === "active" || subscription.status === "trialing" ? SubscriptionStatus.ACTIVE : subscription.status === "canceled" ? SubscriptionStatus.CANCELED : SubscriptionStatus.EXPIRED;
  console.log("new subscription status", status);
  const currentPeriodEnd = await getCurrentPeriodEnd(subscription);
  const isSubscriptionExist = await prisma.subscription.findUnique({
    where: {
      subscriptionId
    }
  });
  if (!isSubscriptionExist) {
    console.log(
      `Webhook : No Subscription found for subscription id : ${subscriptionId}`
    );
    return;
  }
  await prisma.subscription.update({
    where: {
      subscriptionId
    },
    data: {
      status,
      currentPeriodEnd
    }
  });
};
var subscriptionUtils = {
  getCurrentPeriodEnd,
  handleCheckoutComplete,
  handleSubscriptionChange
};

// src/module/subscription/subscription.service.ts
var checkout = async (userId) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findFirstOrThrow({
      where: {
        id: userId
      },
      include: {
        subscription: true
      },
      omit: {
        password: true
      }
    });
    let stripeCustomerId = user.subscription?.stripeCustomerId;
    if (!stripeCustomerId) {
      let customer = await stripe.customers.create({
        name: user.name,
        email: user.email,
        metadata: {
          userId: user.id
        }
      });
      console.log("created stripe customer", customer);
      stripeCustomerId = customer.id;
    }
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1ToR173NZ7eZz1kRHqIXa5pZ",
          quantity: 1
        }
      ],
      mode: "subscription",
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      success_url: `${config_default.app_url}/?success=true`,
      cancel_url: `${config_default.app_url}/?success=false`,
      metadata: {
        userId: user.id
      }
    });
    return session.url;
  });
  return { checkoutUrl: transactionResult };
};
var webhookHandler = async (payload, signature) => {
  const webhookSecret = config_default.stripe_webhook_secret;
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    webhookSecret
  );
  switch (event.type) {
    case "checkout.session.completed":
      await subscriptionUtils.handleCheckoutComplete(event.data.object);
    case "customer.subscription.updated":
      await subscriptionUtils.handleSubscriptionChange(
        event.data.object
      );
      console.log("customer subscription event triggered ", event.type);
      break;
    case "customer.subscription.deleted":
      await subscriptionUtils.handleSubscriptionChange(
        event.data.object
      );
      console.log("customer subscription event triggered ", event.type, event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}.`);
  }
};
var subscriptionService = { checkout, webhookHandler };

// src/module/subscription/subscription.controller.ts
import { StatusCodes as StatusCodes6 } from "http-status-codes";
var checkout2 = catchAsync(
  async (req, res, next) => {
    const userId = req.user?.id;
    console.log("user id", userId);
    const result = await subscriptionService.checkout(userId);
    sendSuccessResponse(res, {
      success: true,
      statusCode: StatusCodes6.OK,
      message: "Check Out Session Created",
      data: result
    });
  }
);
var webhookHandler2 = catchAsync(
  async (req, res, next) => {
    const signature = req.headers["stripe-signature"];
    const result = await subscriptionService.webhookHandler(
      req.body,
      signature
    );
  }
);
var subscriptionController = { checkout: checkout2, webhookHandler: webhookHandler2 };

// src/module/subscription/subscription.route.ts
var subscriptionRoutes = Router5();
subscriptionRoutes.post(
  "/checkout",
  authMiddleware.auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  subscriptionController.checkout
);
subscriptionRoutes.post("/webhook", subscriptionController.webhookHandler);

// src/app.ts
var app = express();
var endpointSecret = config_default.stripe_webhook_secret;
app.use(
  cors({
    origin: config_default.app_url,
    credentials: true
  })
);
app.post(
  "/api/subscription/webhook",
  express.raw({ type: "application/json" })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", user_route_default);
app.use("/api/auth", auth_route_default);
app.use("/api/posts", post_route_default);
app.use("/api/comments", comment_route_default);
app.use("/api/subscription", subscriptionRoutes);
app.use(not_found_default);
app.use(global_error_default);
var app_default = app;

// src/server.ts
var port = config_default.port;
async function main() {
  try {
    await prisma.$connect();
    app_default.listen(port, () => {
      console.log("data base connection successful");
      console.log(`prisma server listening on port ${port}`);
    });
  } catch (error) {
    await prisma.$disconnect();
    console.log("Error occurred on server start", error);
    process.exit(1);
  }
}
main();
//# sourceMappingURL=server.js.map