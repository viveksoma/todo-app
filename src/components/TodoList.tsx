import React from "react";
import { List } from "@mui/material";
import { Task } from "../types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  tasks: Task[];
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, toggleComplete, deleteTask }) => {
  return (
    <List>
      {tasks.length === 0 ? <p>No tasks available.</p> : null}
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} />
      ))}
    </List>
  );
};

export default TodoList;
