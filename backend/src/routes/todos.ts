import { Router } from "express";
import {
  getTodos,
  addTodo,
  deleteTodo,
  toggleTodo,
} from "../controllers/todosController";

const router = Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id", toggleTodo);

export default router;
