// components/Header/Header.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store"; 
import { logout } from "../../features/auth/authSlice"; 
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

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

        {!isAuthenticated ? (
          <>
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
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className={location.pathname === "/profile" ? styles.active : ""}
            >
              Личный кабинет
            </Link>
            <button
              onClick={() => {
                dispatch(logout());
                localStorage.removeItem("token"); 
              }}
            >
              Выйти
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
