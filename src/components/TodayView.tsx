import React from 'react';
import { TodoItem } from './TodoItem';
import { useTodoStore } from '../store/todoStore';

export const TodayView: React.FC = () => {
  const { todos } = useTodoStore();
  const todayTodos = todos.filter(todo => todo.isForToday);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-slate-800">Today's Tasks</h2>
        <span className="text-sm text-slate-500">{todayTodos.length} tasks</span>
      </div>
      <div className="space-y-2">
        {todayTodos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {todayTodos.length === 0 && (
          <p className="text-slate-500 text-center py-8">No tasks for today. Star some tasks to see them here!</p>
        )}
      </div>
    </div>
  );
};