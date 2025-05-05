// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPart from "./components/mainPart/mainPart";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initAuth } from "./features/auth/authSlice";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(initAuth(token));
        }
    }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<MainPart />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/" />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <ProfilePage />{" "}
                        </PrivateRoute>
                    }
                />
            </Routes>
        </>
    );
}

export default App;
