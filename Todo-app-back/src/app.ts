import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.routes';


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todoapp";
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log(err));

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => console.log('Server running at http://localhost:{PORT}'));

export default app;