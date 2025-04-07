// components/Header/Header.tsx
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1>📝 Мой To-Do</h1>
      </div>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={location.pathname === "/" ? styles.active : ""}
        >
          Главная
        </Link>
        <Link
          to="/register"
          className={location.pathname === "/register" ? styles.active : ""}
        >
          Регистрация
        </Link>
        <Link
          to="/login"
          className={location.pathname === "/login" ? styles.active : ""}
        >
          Войти
        </Link>
      </nav>
    </header>
  );
}
