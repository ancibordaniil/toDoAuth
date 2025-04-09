import { Request, Response, NextFunction } from "express";
import Todo from "../models/Todo";

export const getTodos = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const todos = await Todo.find();
  res.json(todos);
};

interface AddTodoBody {
  title: string;
}

export const addTodo = async (
  req: Request<{}, {}, AddTodoBody>,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { title } = req.body;
  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const newTodo = new Todo({ title });
  await newTodo.save();
  res.status(201).json(newTodo);
};

interface TodoParams {
  id: string;
}

export const deleteTodo = async (
  req: Request<TodoParams>,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(204).end();
};

export const toggleTodo = async (
  req: Request<TodoParams>,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const todo = await Todo.findById(id);

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};
