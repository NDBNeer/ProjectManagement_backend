import express from "express";

import { connectDB } from "./config/db.js";
import projectRouter from "./routes/projects.js";

const app = express();
const port = 3000;

connectDB();

app.use(express.json());
app.use("/projects", projectRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
