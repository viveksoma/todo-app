import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";
import "@testing-library/jest-dom";


describe("TodoForm", () => {
  test("renders the input and button", () => {
    render(<TodoForm addTask={jest.fn()} />);
    
    expect(screen.getByLabelText(/add a task/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  test("disables the add button when the input is empty", () => {
    render(<TodoForm addTask={jest.fn()} />);

    const addButton = screen.getByRole("button", { name: /add/i });
    expect(addButton).toBeDisabled(); // Initially disabled

    const input = screen.getByLabelText(/add a task/i);
    fireEvent.change(input, { target: { value: "New Task" } });

    expect(addButton).not.toBeDisabled(); // Should be enabled now

    fireEvent.change(input, { target: { value: "" } });
    expect(addButton).toBeDisabled(); // Disabled again
  });

  test("calls addTask with the correct task when submitting a valid task", () => {
    const addTaskMock = jest.fn();
    render(<TodoForm addTask={addTaskMock} />);
    
    const input = screen.getByLabelText(/add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(addTaskMock).toHaveBeenCalledWith("New Task");
  });

  test("does not call addTask if input is empty", () => {
    const addTaskMock = jest.fn();
    render(<TodoForm addTask={addTaskMock} />);
    
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.click(addButton);

    expect(addTaskMock).not.toHaveBeenCalled();
  });
});
