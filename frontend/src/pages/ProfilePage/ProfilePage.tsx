// pages/ProfilePage/ProfilePage.tsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.module.scss";

interface ProfileData {
  username: string;
  email: string;
}

export default function ProfilePage() {
  const { isAuthenticated, token } = useSelector((s: RootState) => s.auth);
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData>({ username: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Не удалось загрузить профиль");
        return res.json();
      })
      .then((data: ProfileData) => setProfile(data))
      .catch((err: unknown) => {
        if (err instanceof Error) setError(err.message);
        else setError("Неизвестная ошибка");
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated, token, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Ошибка обновления");
      }
      const updated: ProfileData = await res.json();
      setProfile(updated);
      alert("Профиль обновлён");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Неизвестная ошибка при сохранении");
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.wrapper}>
      <h2>Личный кабинет</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Имя пользователя<br/>
          <input
            name="username"
            value={profile.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Email<br/>
          <input
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}
