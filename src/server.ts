import app from "./app";
import { initalizeDatabase } from "./config/database";
import config from "./config/env";
const port = config.port;

(async () => {
  try {
    // console.log("connection ok");
    await initalizeDatabase();
    // console.log("connection ok2");
    app.listen(port, () => {
      console.log(`SERVER IS RUNNING AT ${port}`);
    });
  } catch (error) {
    console.log("SERVER FAILED TO CONNECT", error);
  }
})();
