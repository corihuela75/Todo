import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/todos", todoRoutes);

export default app;
