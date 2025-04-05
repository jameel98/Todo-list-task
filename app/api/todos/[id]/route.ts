import { NextRequest, NextResponse } from "next/server";
import fs from "fs";

import { todosFilePath as filePath } from "@/app/utils/fileUtils"; 

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  // Await params
  const { id } = await params;

  const todos = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  const index = todos.findIndex((todo: any) => todo.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  const updatedData = await req.json();
  todos[index] = { ...todos[index], ...updatedData };
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));

  return NextResponse.json(todos[index]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  // Await params
  const { id } = await params;

  const todos = JSON.parse(fs.readFileSync(filePath, "utf8") || "[]");
  const index = todos.findIndex((todo: any) => todo.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  const deleted = todos.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));

  return NextResponse.json(deleted[0]);
}

