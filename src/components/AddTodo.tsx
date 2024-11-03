import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { PlusIcon } from '@heroicons/react/24/outline';

export const AddTodo: React.FC = () => {
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('Personal');
  const { addTodo, domains } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo(title.trim(), domain);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 rounded-xl border-slate-200 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500"
      />
      <select
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        className="rounded-xl border-slate-200 px-4 py-3 bg-white text-slate-800"
      >
        {domains.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <PlusIcon className="h-5 w-5" />
        <span>Add Task</span>
      </button>
    </form>
  );
};