import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "todos.json");

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  interface Todo {
    id: string;
    [key: string]: any; // Adjust this to match the actual structure of your todos
  }

  const todos: Todo[] = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const index = todos.findIndex((todo: Todo) => todo.id === id);

  if (index === -1) return res.status(404).json({ message: "Not found" });

  if (req.method === "PUT") {
    todos[index] = { ...todos[index], ...req.body };
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
    res.status(200).json(todos[index]);
  } else if (req.method === "DELETE") {
    const deletedTodo = todos.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
    res.status(200).json(deletedTodo);
  }
}