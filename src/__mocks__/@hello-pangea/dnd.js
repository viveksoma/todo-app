const dnd = jest.createMockFromModule("@hello-pangea/dnd");

module.exports = {
  ...dnd,
  Droppable: ({ children }) => children({ provided: {}, snapshot: {} }, {}),
  Draggable: ({ children }) =>
    children(
      { provided: { draggableProps: {}, dragHandleProps: {} }, snapshot: {} },
      {}
    ),
  DragDropContext: ({ children }) => <div>{children}</div>,
};
