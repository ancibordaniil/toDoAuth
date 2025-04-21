import { Request, Response } from "express";
import Todo from "../models/Todo";

export const getTodos = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const todos = await Todo.find({ userId });
  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { title } = req.body;

  const newTodo = await new Todo({ userId, title, completed: false }).save();
  res.status(201).json(newTodo);
};

export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId;
      const todoId = req.params.id;
  
      const deleted = await Todo.findOneAndDelete({ _id: todoId, userId });
      if (!deleted) {
        res.status(404).json({ message: "Задача не найдена" });
        return;
      }
  
      res.status(200).json({ message: "Задача удалена" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при удалении" });
    }
  };
  
