"use client";
import { useState, useEffect } from "react";
import TodoList from "./components/list/List";
import TodoForm from "./components/form/Form"; 
import { v4 as uuidv4 } from "uuid";

type TodoStatus = "notStarted" | "inProgress" | "completed";

interface Todo {
  id: string;
  title: string;
  description: string;
  stat: TodoStatus;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
    };
    fetchTodos();
  }, []);

  const addTodo = async (todo: { title: string; description: string; stat: TodoStatus }) => {
    const newTodo: Todo = { id: uuidv4(), ...todo };
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id: string): Promise<void> => {
    setTodos(todos.filter((todo) => todo.id !== id));
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
  };

  const updateTodo = async (updated: Todo): Promise<void> => {
    setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)));
    await fetch(`/api/todos/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  };

  return (
    <div>
      <h1>TODO List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />
    </div>
  );
}
