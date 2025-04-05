"use client";
import { useState } from "react";
import styles from "./form.module.css"; 

export type TodoStatus = "completed" | "inProgress" | "notStarted";

interface TodoFormProps {
  onAddTodo: (todo: { title: string; description: string; stat: TodoStatus }) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stat, setStat] = useState<TodoStatus>("notStarted");

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
        onChange={(e) => setStat(e.target.value as TodoStatus)}
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
