import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todos"; 
import authRoutes from "./routes/authRoutes";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", 
        methods: ["GET", "POST", "PATCH", "DELETE"],
        credentials: true, 
    })
);
app.use(express.json());
app.use("/api/todos", todoRoutes); 
app.use("/api/auth", authRoutes);
app.listen(5000, () => {
    console.log("Backend is running on http://localhost:5000");
});
export default app;
