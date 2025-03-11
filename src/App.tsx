import React from "react"; // <-- Add this import
import { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import { Task } from "./types";
import { v4 as uuidv4 } from "uuid";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import "./assets/styles/Styles.css";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (savedTasks) setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: uuidv4(), text, completed: false }]);
  };

  return (
    <Box className="app-container" display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Container maxWidth="md" className="todo-container" sx={{ width: 800 }}>
        <Card elevation={5} sx={{ borderRadius: 3, height: "80vh", display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flexShrink: 0 }}>
            <Typography variant="h4" align="center" gutterBottom className="todo-header" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
              Todo List
            </Typography>

            <TodoForm addTask={addTask} />
          </CardContent>

        </Card>
      </Container>
    </Box>
  );
};

export default App;
