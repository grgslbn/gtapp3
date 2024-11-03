import React from 'react';
import { useTodoStore } from '../store/todoStore';

export const Stats: React.FC = () => {
  const { todos } = useTodoStore();
  
  const stats = [
    { label: 'Total', count: todos.length },
    { label: 'In Progress', count: todos.filter(t => t.status === 'in-progress').length },
    { label: 'Completed', count: todos.filter(t => t.status === 'done').length },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map(({ label, count }) => (
        <div key={label} className="bg-slate-50 rounded-xl p-4">
          <p className="text-slate-600 text-sm">{label}</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{count}</p>
        </div>
      ))}
    </div>
  );
};