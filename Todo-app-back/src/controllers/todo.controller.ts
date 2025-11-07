// src/controllers/todo.controller.ts
import Todo from '../models/todo.model';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';



export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.find();
  res.json(todos);
};

export const getTodo = async (req: Request, res: Response) => {
  const todo = await Todo.findOne({ uid: req.params.uid });
  res.json(todo);
};


export const createTodo = async (req: Request, res: Response ) => {
  const newTodo = new Todo({
    ...req.body,
    uid: uuidv4()
  });

  await newTodo.save();
  res.json({ message: 'Todo created', todo: newTodo });
};

export const updateTodo = async (req: Request, res: Response) => {
  const todo = await Todo.findOneAndUpdate(
    { uid: req.params.uid }, 
    req.body,
    { new: true }
  );
  res.json({ message: 'Todo updated', todo });
};

export const deleteTodo = async (req: Request, res: Response) => {
  await Todo.findOneAndDelete({ uid: req.params.uid });
  res.json({ message: 'Todo deleted' });
};
