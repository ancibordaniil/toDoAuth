import { useEffect, useState } from "react";
import styles from "./MainPart.module.scss";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export default function MainPart() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Ошибка при загрузке задач");
        const data = await res.json();
        setTodos(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchTodos();
  }, [token]);

  const addTodo = async () => {
    if (!input.trim() || !token) return;

    try {
      const res = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: input }),
      });

      if (!res.ok) throw new Error("Ошибка при добавлении");
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const removeTodo = async (id: string) => {
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка при удалении");
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.inputBlock}>
        <input
          type="text"
          placeholder="Новая задача"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Добавить</button>
      </div>

      <ul className={styles.list}>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => removeTodo(todo._id)}>✖</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
