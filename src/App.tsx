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
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import "./assets/styles/Styles.css";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");

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

  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  return (
    <Box className="app-container" display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Container maxWidth="md" className="todo-container" sx={{ width: 800 }}>
        <Card elevation={5} sx={{ borderRadius: 3, height: "80vh", display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flexShrink: 0 }}>
            <Typography variant="h4" align="center" gutterBottom className="todo-header" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
              Todo List
            </Typography>

            <TodoForm addTask={addTask} />
            {/* Filter */}
            <Box display="flex" justifyContent="center" mt={2}>
              <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={(_, newFilter) => newFilter && setFilter(newFilter)}
                sx={{ bgcolor: "#e3f2fd", borderRadius: 2 }}
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="active">Active</ToggleButton>
                <ToggleButton value="completed">Completed</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </CardContent>

           {/* Task List */}
           <Box mt={2} flex={1} overflow="auto" p={2}>
            <TodoList tasks={filteredTasks} toggleComplete={toggleComplete} deleteTask={deleteTask} />
          </Box>

        </Card>
      </Container>
    </Box>
  );
};

export default App;
