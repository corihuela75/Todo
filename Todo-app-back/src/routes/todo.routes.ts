// src/routes/todo.routes.ts
import { Router } from 'express';
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todo.controller';

const router = Router();

router.get('/', getTodos);
router.get('/:uid', getTodo);
router.post('/', createTodo);
router.put('/:uid', updateTodo);
router.delete('/:uid', deleteTodo);

export default router;
