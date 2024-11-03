import React, { useState } from 'react';
import { useTodoStore } from '../store/todoStore';
import { PlusIcon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export const DomainManager: React.FC = () => {
  const [newDomain, setNewDomain] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { domains, addDomain, deleteDomain } = useTodoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDomain.trim() && !domains.includes(newDomain.trim())) {
      addDomain(newDomain.trim());
      setNewDomain('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2 items-center">
        {domains.map(domain => (
          <div
            key={domain}
            className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
          >
            <span>{domain}</span>
            {domain !== 'Personal' && (
              <button
                onClick={() => deleteDomain(domain)}
                className="text-gray-500 hover:text-red-500"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100"
        >
          <PlusIcon className="h-4 w-4" />
          <span className="text-sm">Add Domain</span>
          <ChevronDownIcon className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      
      {isExpanded && (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="Enter domain name..."
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </form>
      )}
    </div>
  );
};