import React from 'react';
import { Todo } from '../types/todo';
import { TrashIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useTodoStore } from '../store/todoStore';

interface TodoItemProps {
  todo: Todo;
  isDraggable?: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, isDraggable }) => {
  const { updateTodoStatus, deleteTodo, domains, updateTodoDomain, toggleTodoToday } = useTodoStore();

  const statusColors = {
    'todo': 'bg-slate-100',
    'in-progress': 'bg-blue-100',
    'done': 'bg-green-100'
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-100 p-4 ${isDraggable ? 'cursor-move' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-900 font-medium">{todo.title}</p>
            <button
              onClick={() => toggleTodoToday(todo.id)}
              className={`ml-2 ${todo.isForToday ? 'text-yellow-500' : 'text-slate-300'} hover:text-yellow-500 transition-colors`}
            >
              {todo.isForToday ? <StarIconSolid className="h-5 w-5" /> : <StarIcon className="h-5 w-5" />}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={todo.status}
              onChange={(e) => updateTodoStatus(todo.id, e.target.value as Todo['status'])}
              className={`text-sm rounded-full px-3 py-1 border-0 ${statusColors[todo.status]}`}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <select
              value={todo.domain}
              onChange={(e) => updateTodoDomain(todo.id, e.target.value)}
              className="text-sm bg-slate-50 rounded-full px-3 py-1 border-0"
            >
              {domains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-slate-400 hover:text-red-500 transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};