import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodoStore } from '../store/todoStore';

export const DomainView: React.FC = () => {
  const { todos, domains } = useTodoStore();

  return (
    <div className="space-y-6">
      {domains.map(domain => (
        <div key={domain} className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium mb-4">{domain}</h3>
          <div className="space-y-2">
            {todos
              .filter(todo => todo.domain === domain)
              .map(todo => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};