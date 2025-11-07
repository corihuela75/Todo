import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todoRoutes from './routes/todo.routes';

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.log(err));

app.use('/api/todos', todoRoutes);

app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'));
