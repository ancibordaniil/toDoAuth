// pages/LoginPage/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice"; // Путь к твоему authSlice
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Хук для диспатча действий

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      console.log("Отправляем данные:", { email, password });

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Ошибка HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data) {
          throw new Error('Пустой ответ от сервера');
        }

        if (data.token) {
          localStorage.setItem("token", data.token);

          // Диспатчим действие login в Redux
          dispatch(login(data.token));

          console.log("Успешный вход:", data);
          navigate("/profile"); // Переход в личный кабинет
        } else {
          console.error("Ошибка входа: отсутствует токен");
          alert(data.message || "Ошибка входа");
        }
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
        
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert("Произошла неизвестная ошибка");
        }
      }
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Вход</h2>
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
        <button type="submit">Войти</button>
      </form>
    </div>
  );
}
