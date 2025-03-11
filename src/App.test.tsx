import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
  Storage.prototype.setItem = jest.fn();
});

describe("App Component", () => {
  test("renders the Todo List header", () => {
    render(<App />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
  });

  test("allows users to add a task", async () => {
    render(<App />);

    const input = screen.getByLabelText(/add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/new task/i)).toBeInTheDocument());  // Ensure task is added to the list
  });

  test("does not add empty tasks", () => {
    render(<App />);
  
    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);
  
    expect(screen.getByText(/no tasks available/i)).toBeInTheDocument();
  });

  test("saves tasks in localStorage", () => {
    render(<App />);

    const input = screen.getByLabelText(/add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Persistent Task" } });
    fireEvent.click(addButton);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "tasks",
      expect.stringContaining("Persistent Task")
    );
  });

  test("renders 'No tasks available' message when no tasks exist", () => {
    render(<App />);

    expect(screen.getByText(/no tasks available/i)).toBeInTheDocument();
  });

  test("deletes a task", async () => {
    render(<App />);

    const input = screen.getByLabelText(/add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Task to Delete" } });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText("Task to Delete")).toBeInTheDocument());

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => expect(screen.queryByText("Task to Delete")).not.toBeInTheDocument());
  });
});
