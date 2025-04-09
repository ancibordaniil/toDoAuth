// components/MainPart/MainPart.tsx
import { useState } from "react";
import styles from "./MainPart.module.scss";
interface Todo {
  id: number;
  text: string;
}

export default function MainPart() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput("");
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
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
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>✖</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
