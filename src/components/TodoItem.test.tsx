import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";
import { Task } from "../types";
import "@testing-library/jest-dom";

describe("TodoItem", () => {
  const task: Task = { id: "1", text: "Test Task", completed: false };
  const toggleCompleteMock = jest.fn();
  const deleteTaskMock = jest.fn();

  test("renders the task", () => {
    render(<TodoItem task={task} toggleComplete={toggleCompleteMock} deleteTask={deleteTaskMock} />);
    
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  test("calls toggleComplete when the checkbox is clicked", () => {
    render(<TodoItem task={task} toggleComplete={toggleCompleteMock} deleteTask={deleteTaskMock} />);
    
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(toggleCompleteMock).toHaveBeenCalledWith("1");
  });

  test("calls deleteTask when the delete button is clicked", () => {
    render(<TodoItem task={task} toggleComplete={toggleCompleteMock} deleteTask={deleteTaskMock} />);
    
    const deleteButton = screen.getByRole("button", { name: /delete task/i });
    fireEvent.click(deleteButton);

    expect(deleteTaskMock).toHaveBeenCalledWith("1");
  });
});
