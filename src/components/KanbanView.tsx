import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { TodoItem } from './TodoItem';
import { useTodoStore } from '../store/todoStore';
import { TodoStatus } from '../types/todo';

const columns: { id: TodoStatus; title: string }[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'done', title: 'Done' }
];

export const KanbanView: React.FC = () => {
  const { todos, updateTodoStatus } = useTodoStore();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const todoId = result.draggableId;
    const newStatus = result.destination.droppableId as TodoStatus;
    updateTodoStatus(todoId, newStatus);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(column => (
          <div key={column.id} className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium mb-4">{column.title}</h3>
            <Droppable droppableId={column.id} key={column.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2 min-h-[50px]"
                >
                  {todos
                    .filter(todo => todo.status === column.id)
                    .map((todo, index) => (
                      <Draggable 
                        key={todo.id} 
                        draggableId={todo.id} 
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style
                            }}
                          >
                            <TodoItem todo={todo} isDraggable />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};