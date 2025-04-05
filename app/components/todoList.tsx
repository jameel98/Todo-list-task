import styles from "../styles/Todo.module.css";

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggleComplete, onDelete }: TodoListProps) {
    return (
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? styles.completed : ""}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => onToggleComplete(todo.id)}>
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }