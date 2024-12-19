import { Request, Response } from "express";
import Todo from "../models/todo";

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const newTodo = new Todo({
            title,
            description,
            userId: req.user.id,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(500).json({ error: "Failed to create todo" });
    }
};

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch todos" });
    }
};
