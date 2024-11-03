import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodoStore } from '../store/todoStore';

export const ListView: React.FC = () => {
  const { todos } = useTodoStore();

  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};