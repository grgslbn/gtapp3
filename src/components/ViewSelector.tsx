import React from 'react';
import { ViewMode } from '../types/todo';
import { ListBulletIcon, ViewColumnsIcon, TagIcon, StarIcon } from '@heroicons/react/24/outline';

interface ViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const ViewSelector: React.FC<ViewSelectorProps> = ({ currentView, onViewChange }) => {
  const views = [
    { id: 'today' as ViewMode, icon: StarIcon, label: 'Today' },
    { id: 'list' as ViewMode, icon: ListBulletIcon, label: 'List' },
    { id: 'kanban' as ViewMode, icon: ViewColumnsIcon, label: 'Kanban' },
    { id: 'domain' as ViewMode, icon: TagIcon, label: 'Domains' },
  ];

  return (
    <div className="bg-slate-100 p-1 rounded-lg flex gap-1">
      {views.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onViewChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
            currentView === id
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};