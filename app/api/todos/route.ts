import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

import { todosFilePath as filePath } from "@/app/utils/fileUtils"; 

export async function GET(req: NextRequest) {
  const todos = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  return NextResponse.json(todos);
}

export async function POST(req: NextRequest) {
  const newTodo = await req.json();
  const todos = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  todos.push(newTodo);
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
  return NextResponse.json(newTodo, { status: 201 });
}