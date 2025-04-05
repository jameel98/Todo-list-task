"use client";
import { useState, useEffect } from "react";
import TodoList from "../app/components/todoList";
import TodoForm from "../app/components/TodoForm"; 
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // Example: Fetch initial todos from an API
    const fetchTodos = async () => {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const addTodo = async (todo: { title: string; description: string }) => {
    const newTodo: Todo = { id: uuidv4(), ...todo, completed: false };
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = async (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todos.find((t) => t.id === id)?.completed }),
    });
  };

  const deleteTodo = async (id: string): Promise<void> => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
  };

  return (
    <div>
      <h1>TODO List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleComplete={toggleComplete} onDelete={deleteTodo} />
    </div>
  );
}
