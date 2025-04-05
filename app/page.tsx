"use client";
import { useState, useEffect } from "react";
import TodoList from "./components/list/List";
import TodoForm from "./components/form/Form"; 
import { v4 as uuidv4 } from "uuid";
import { TaskStatus, Task } from "@/app/types/todoInterfaces";


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTasks(data);
    };
    fetchTodos();
  }, []);

  const addTask = async (task: { title: string; description: string; stat: TaskStatus }) => {
    const newTodo: Task = { id: uuidv4(), ...task };
    await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    setTasks([...tasks, newTodo]);
  };

  const deleteTask = async (id: string): Promise<void> => {
    setTasks(tasks.filter((task) => task.id !== id));
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
  };

  const updateTask = async (updated: Task): Promise<void> => {
    setTasks(tasks.map((task) => (task.id === updated.id ? updated : task)));
    await fetch(`/api/todos/${updated.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  };

  return (
    <div>
      <h1>Tasks List</h1>
      <TodoForm onAddTodo={addTask} />
      <TodoList
        tasks={tasks}
        onDelete={deleteTask}
        onUpdate={updateTask}
      />
    </div>
  );
}
