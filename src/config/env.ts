import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
  port: process.env.PORT,
  connection_uri: process.env.CONNECTION_URI,
};
export default config;
