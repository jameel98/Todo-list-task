import { useState } from "react";
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
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      {tasks.map((task) => {
        const isEditing = editingId === task.id;

        return (
          <div
            key={task.id}
            className={`p-6 rounded-xl shadow-md border transition-all ${
              task.stat === "completed" ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
            }`}
          >
            {isEditing ? (
              <div className="space-y-4">
                <input
                  value={editedTask.title || ""}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  placeholder="Title"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={editedTask.description || ""}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  placeholder="Description"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={editedTask.stat}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, stat: e.target.value as TaskStatus })
                  }
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="notStarted">Not Started</option>
                  <option value="inProgress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-white text-xs ${
                        task.stat === "completed"
                          ? "bg-green-600"
                          : task.stat === "inProgress"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {task.stat}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}