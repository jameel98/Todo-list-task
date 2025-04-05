import path from "path";
import fs from "fs";

const filePath = path.join(process.cwd(), "data", "todos.json");

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const todos = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    const todos = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const newTodo = req.body;
    todos.push(newTodo);
    fs.writeFileSync(filePath, JSON.stringify(todos));
    res.status(201).json(newTodo);
  }
}