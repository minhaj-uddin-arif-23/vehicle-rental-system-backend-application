import express from "express";
import cors from "cors";
import router from "./routes";
const app = express();

// middleaware
app.use(express.json());
app.use(cors());
// entry point of all route

app.use("/api/v1", router);

export default app;
