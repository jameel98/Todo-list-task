import { useState } from "react";
import styles from "./list.module.css"; 
import { TaskStatus, Task, TodoListProps } from "@/app/types/todoInterfaces";

export default function TodoList({ tasks, onDelete, onUpdate }: TodoListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTask, setEditedTask] = useState<Partial<Task>>({});

  const handleEdit = (task: Task) => {
    setEditingId(task.id);
    setEditedTask({ ...task });
  };

  const handleSave = () => {
    if (editingId && editedTask.title && editedTask.description && editedTask.stat) {
      onUpdate(editedTask as Task);
      setEditingId(null);
      setEditedTask({});
    }
  };

  return (
    <div className={styles.todoList}>
      {tasks.map((task) => {
        const isEditing = editingId === task.id;

        return (
          <div key={task.id} className={`${styles.todoItem} ${task.stat === "completed" ? styles.completed : ""}`}>
            {isEditing ? (
              <div className={styles.editForm}>
                <input
                  value={editedTask.title || ""}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  placeholder="Title"
                />
                <textarea
                  value={editedTask.description || ""}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  placeholder="Description"
                />
                <select
                  value={editedTask.stat}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, stat: e.target.value as TaskStatus })
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
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p className={styles.status}>Status: <span>{task.stat}</span></p>
                </div>
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(task)} className={styles.editBtn}>Edit</button>
                  <button onClick={() => onDelete(task.id)} className={styles.deleteBtn}>Delete</button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
