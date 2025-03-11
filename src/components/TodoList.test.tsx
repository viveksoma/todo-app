// src/components/TodoList.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import { Task } from "../types";
import "@testing-library/jest-dom";

describe("TodoList", () => {
  const tasks: Task[] = [
    { id: "1", text: "Task 1", completed: false },
    { id: "2", text: "Task 2", completed: true }
  ];
  const toggleCompleteMock = jest.fn();
  const deleteTaskMock = jest.fn();

  test("renders the list of tasks", () => {
    render(<TodoList tasks={tasks} toggleComplete={toggleCompleteMock} deleteTask={deleteTaskMock} />);
    
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  test("renders 'No tasks available' when there are no tasks", () => {
    render(<TodoList tasks={[]} toggleComplete={toggleCompleteMock} deleteTask={deleteTaskMock} />);
    
    expect(screen.getByText(/no tasks available/i)).toBeInTheDocument();
  });
});
