import React from "react";
import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface TodoFormProps {
  addTask: (task: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTask }) => {
  const [task, setTask] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    addTask(task);
    setTask("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        label="Add a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit" disabled={!task.trim()}>
        Add
      </Button>
    </Box>
  );
};

export default TodoForm;
