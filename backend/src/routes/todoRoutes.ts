// routes/todoRoutes.ts
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getTodos, createTodo, deleteTodo } from "../controllers/todosController";

const router = Router();

router.get("/", authMiddleware, getTodos);
router.post("/", authMiddleware, createTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;
