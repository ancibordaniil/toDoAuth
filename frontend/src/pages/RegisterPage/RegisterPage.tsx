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

        if (username && email && password) {
            console.log("Отправляем данные:", { username, email, password });
            try {
                const response = await fetch(
                    "http://localhost:5000/api/auth/register",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ username, email, password }),
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    console.log("Регистрация прошла успешно:", data);
                    navigate("/login");
                } else {
                    console.error("Ошибка регистрации:", data.message);
                    alert(data.message);
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
