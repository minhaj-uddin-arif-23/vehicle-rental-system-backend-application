import express from "express";
import cors from "cors";
const app = express();

// middleaware
app.use(express.json());
app.use(cors());
// entry point of all route

export default app;
