"use client";

import { useState } from "react";
import styles from "./form.module.css";
import { TaskStatus, Task } from "@/app/types/todoInterfaces";

interface TaskFormProps {
  onAddTodo: (task: Omit<Task, "id">) => void;
}

export default function TodoForm({ onAddTodo }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stat, setStat] = useState<TaskStatus>("notStarted");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTodo({ title, description, stat });

    setTitle("");
    setDescription("");
    setStat("notStarted");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className={styles.input}
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className={styles.input}
      />
      <select
        value={stat}
        onChange={(e) => setStat(e.target.value as TaskStatus)}
        className={styles.select}
      >
        <option value="notStarted">Not Started</option>
        <option value="inProgress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit" className={styles.button}>Add</button>
    </form>
  );
}
