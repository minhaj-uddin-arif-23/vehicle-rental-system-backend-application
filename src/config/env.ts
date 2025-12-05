import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT,
  connection_uri: process.env.CONNECTION_URI,
  json_secret: process.env.JSON_SECRET,
};
export default config;
