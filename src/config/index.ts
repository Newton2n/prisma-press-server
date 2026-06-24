import path from "node:path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT || 5000,
  app_url: process.env.APP_URL,
  database_url: process.env.DATABASE_URL,
};
