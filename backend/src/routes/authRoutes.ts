import { Router } from "express";
import { registerUser, loginUser, getProfile, updateProfile } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware"; 

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);

export default router;
