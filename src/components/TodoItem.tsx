import React from "react";
import { Checkbox, IconButton, ListItem, ListItemText } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Task } from "../types";

interface TodoItemProps {
  task: Task;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ task, toggleComplete, deleteTask }) => {
  return (
    <ListItem
      sx={{
        display: "flex",
        justifyContent: "space-between",
        bgcolor: task.completed ? "lightgray" : "white",
        borderRadius: 1,
        mb: 1,
      }}
    >
      <Checkbox checked={task.completed} onChange={() => toggleComplete(task.id)} />
      <ListItemText primary={task.text} sx={{ textDecoration: task.completed ? "line-through" : "none" }} />
      <IconButton onClick={() => deleteTask(task.id)} color="error" aria-label="delete task">
        <Delete />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
