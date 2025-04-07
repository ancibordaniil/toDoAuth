// pages/RegisterPage/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.scss";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка на пустые поля
    if (username && email && password) {
      console.log("Отправляем данные:", { username, email, password });

      // Отправляем данные на бэкэнд для регистрации
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        // Если регистрация успешна
        if (response.ok) {
          console.log("Регистрация прошла успешно:", data);
          navigate("/login"); // Перенаправляем на страницу входа
        } else {
          console.error("Ошибка регистрации:", data.message);
          alert(data.message); // Показ ошибки
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
        alert("Ошибка соединения с сервером");
      }
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}
