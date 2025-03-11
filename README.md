# Todo List Application

## Overview
This is a simple Todo List application built using React. It allows users to:
- Add new tasks to the list.
- Mark tasks as completed.
- Delete tasks from the list.
- Filter tasks by their completion status (completed, active, or all).

Additionally, it includes drag-and-drop functionality for task reordering and localStorage integration for data persistence.

## Features
- **Task Management**: Add, complete, and delete tasks.
- **Filtering**: View tasks by status (All, Active, Completed).
- **Drag-and-Drop**: Reorder tasks using drag-and-drop (implemented with `@hello-pangea/dnd`).
- **Persistent Storage**: Tasks are saved in localStorage so they persist after page reloads.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Unit Tests**: Includes Jest and React Testing Library tests.

## Technologies Used
- React (with Hooks for state management)
- TypeScript
- Material-UI (for styling)
- `@hello-pangea/dnd` (for drag-and-drop functionality)
- React Testing Library & Jest (for testing)

## Installation & Setup
### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### Steps to Run Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/viveksoma/todo-app.git
   cd todo-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm run dev
   ```
   The app should now be running at `http://localhost:5173/`.

### Running Tests
To run unit tests, use:
```sh
npm test
```
