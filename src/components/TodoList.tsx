import React from "react";
import { List } from "@mui/material";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Task } from "../types";
import TodoItem from "./TodoItem";

interface TodoListProps {
  tasks: Task[];
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, toggleComplete, deleteTask }) => {
  return (
    <Droppable droppableId="todo-list">
      {(provided) => (
        <List
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
         {tasks.length === 0 && <p data-testid="no-tasks">No tasks available.</p>}
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TodoItem task={task} toggleComplete={toggleComplete} deleteTask={deleteTask} />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
};

export default TodoList;
