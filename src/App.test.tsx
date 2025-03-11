import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

beforeEach(() => {
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("App Component", () => {
  test("renders the Todo List header", () => {
    render(<App />);
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
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
});
