export type TaskStatus = "notStarted" | "inProgress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  stat: TaskStatus;
}

export interface TodoListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
  onUpdate: (updatedTask: Task) => void;
}
