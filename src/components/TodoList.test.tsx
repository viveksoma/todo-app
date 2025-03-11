import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TodoList from "./TodoList";
import { Task } from "../types";
import "@testing-library/jest-dom";

jest.mock("react-beautiful-dnd", () => ({
  Droppable: ({ children }: any) => (
    <div data-testid="droppable">{children({ innerRef: jest.fn(), droppableProps: {} })}</div>
  ),
  Draggable: ({ children }: any) => (
    <div data-testid="draggable">{children({ innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} })}</div>
  ),
}));

describe("TodoList", () => {
  const tasks: Task[] = [
    { id: "1", text: "Task 1", completed: false },
    { id: "2", text: "Task 2", completed: true }
  ];
  const toggleCompleteMock = jest.fn();
  const deleteTaskMock = jest.fn();

  test("renders 'No tasks available' when there are no tasks", async () => {
    render(<TodoList tasks={[]} toggleComplete={toggleCompleteMock} deleteTask={deleteTaskMock} />);
  
    const noTasksMessage = await screen.findByTestId("no-tasks");
  
    expect(noTasksMessage).toBeInTheDocument();
  });

  test("renders the list of tasks", async () => {
    render(
      <TodoList
        tasks={tasks}
        toggleComplete={toggleCompleteMock}
        deleteTask={deleteTaskMock}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });
  });

  test("renders the tasks with drag-and-drop functionality", async () => {
    render(<TodoList tasks={tasks} toggleComplete={toggleCompleteMock} deleteTask={deleteTaskMock} />);
  
    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
    });
  
    const draggableItems = screen.getAllByRole("listitem");
    console.log(draggableItems.length); // Debugging line
  
    expect(draggableItems).toHaveLength(2);
  });  

});
