import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import dotenv from 'dotenv';


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(200).json({ message: "User Registered successfully" }); // Do not return res, just send the response
    } catch (err) {
        res.status(500).json({ error: "Registration Failed" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ id: user._id }, 'jwt_secret', { expiresIn: "1hr" });
        res.json({ token });
    } catch (err) {     
        res.status(500).json({ error: "Login Failed" });
    }
};