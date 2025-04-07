// pages/LoginPage/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      console.log("Отправляем данные:", { email, password });

      // Отправляем запрос на бэкэнд для авторизации
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        console.log(response)

        const data = await response.json();

        // Проверка успешного входа
        if (response.ok) {
          // Сохраняем токен в localStorage или context (если нужно)
          localStorage.setItem("token", data.token);

          console.log("Успешный вход:", data);

          // Перенаправляем на главную страницу
          navigate("/");
        } else {
          console.error("Ошибка входа:", data.message);
          alert(data.message); // Выводим ошибку
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
