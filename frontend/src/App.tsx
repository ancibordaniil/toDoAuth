// App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header/Header";
import MainPart from "./components/mainPart/mainPart";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
