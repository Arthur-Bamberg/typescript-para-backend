import express from "express";
import router from "./routes";
import "reflect-metadata";

const app = express();
app.use(express.json());
router(app);

export default app;
