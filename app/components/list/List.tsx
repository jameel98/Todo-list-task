import { useState } from "react";
import styles from "./list.module.css"; 

type TodoStatus = "notStarted" | "inProgress" | "completed";

interface Todo {
  id: string;
  title: string;
  description: string;
  stat: TodoStatus;
}

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onUpdate: (updatedTodo: Todo) => void;
}

export default function TodoList({ todos, onDelete, onUpdate }: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTodo, setEditedTodo] = useState<Partial<Todo>>({});

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditedTodo({ ...todo });
  };

  const handleSave = () => {
    if (editingId && editedTodo.title && editedTodo.description && editedTodo.stat) {
      onUpdate(editedTodo as Todo);
      setEditingId(null);
      setEditedTodo({});
    }
  };

  return (
    <div className={styles.todoList}>
      {todos.map((todo) => {
        const isEditing = editingId === todo.id;

        return (
          <div key={todo.id} className={`${styles.todoItem} ${todo.stat === "completed" ? styles.completed : ""}`}>
            {isEditing ? (
              <div className={styles.editForm}>
                <input
                  value={editedTodo.title || ""}
                  onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
                  placeholder="Title"
                />
                <textarea
                  value={editedTodo.description || ""}
                  onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
                  placeholder="Description"
                />
                <select
                  value={editedTodo.stat}
                  onChange={(e) =>
                    setEditedTodo({ ...editedTodo, stat: e.target.value as TodoStatus })
                  }
                >
                  <option value="notStarted">Not Started</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className={styles.actions}>
                  <button onClick={handleSave} className={styles.saveBtn}>Save</button>
                </div>
              </div>
            ) : (
              <>
                <div className={styles.textContent}>
                  <h3>{todo.title}</h3>
                  <p>{todo.description}</p>
                  <p className={styles.status}>Status: <span>{todo.stat}</span></p>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(todo)} className={styles.editBtn}>Edit</button>
                  <button onClick={() => onDelete(todo.id)} className={styles.deleteBtn}>Delete</button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
