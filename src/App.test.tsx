import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

jest.mock("react-beautiful-dnd", () => ({
  DragDropContext: ({ children }: any) => <div>{children}</div>,
  Droppable: ({ children }: any) => children({ innerRef: jest.fn(), placeholder: null }),
  Draggable: ({ children }: any) => children({ innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} }),
}));

beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
  Storage.prototype.setItem = jest.fn();
});

describe("App Component", () => {
  test("renders the Todo List header", () => {
    render(<App />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
  });

  test("handles corrupted data in localStorage gracefully", async () => {
    render(<App />);

    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
    expect(screen.getByText(/no tasks available/i)).toBeInTheDocument();

    const input = screen.getByLabelText(/add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    await waitFor(() => expect(screen.getByText(/new task/i)).toBeInTheDocument());

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "tasks",
      expect.stringContaining("New Task")
    );
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

  test("filters tasks to show all tasks", async () => {
    render(<App />);
    
    const input = screen.getByLabelText(/add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });
    
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(addButton);
    
    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(addButton);

    const allFilter = screen.getByRole("button", { name: /all/i });
    fireEvent.click(allFilter);
    
    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });
  });

  test("filters tasks to show only active tasks", async () => {
    render(<App />);

    const input = screen.getByLabelText(/add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Active Task" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]); // Mark "Completed Task" as completed

    const activeFilter = screen.getByRole("button", { name: /active/i });
    fireEvent.click(activeFilter);

    await waitFor(() => {
      expect(screen.getByText("Active Task")).toBeInTheDocument();
      expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();
    });
  });

  test("filters tasks to show only completed tasks", async () => {
    render(<App />);

    const input = screen.getByLabelText(/add a task/i);
    const addButton = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "Active Task" } });
    fireEvent.click(addButton);

    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]); // Mark "Completed Task" as completed

    const completedFilter = screen.getByRole("button", { name: /completed/i });
    fireEvent.click(completedFilter);

    await waitFor(() => {
      expect(screen.getByText("Completed Task")).toBeInTheDocument();
      expect(screen.queryByText("Active Task")).not.toBeInTheDocument();
    });
  });
});
