import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userId = (req as any).userId;

        const user = await User.findById(userId).select("username email");

        if (!user) {
            res.status(404).json({ message: "Профиль не найден" });
            return;
        }
        res.json({ username: user.username, email: user.email });
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { username, email } = req.body;

    try {
        const userId = (req as any).userId;

        const user = await User.findById(userId);

        if (!user) {
            res.status(404).json({ message: "Профиль не найден" });
            return;
        }

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        res.json({ username: user.username, email: user.email });
    } catch (error) {
        next(error);
    }
};

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email уже используется!" });
            return;
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({
            message: "Пользователь успешно зарегистрирован",
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Email и пароль обязательны" });
        return;
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Пользователь не найден" });
            return;
        }

        if (password !== user.password) {
            res.status(400).json({ message: "Неверный пароль" });
            return;
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || "secret"
        );

        res.json({ message: "Успешный вход", token });
    } catch (error) {
        next(error);
    }
};
