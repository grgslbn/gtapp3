import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, TodoStatus } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  domains: string[];
  addTodo: (title: string, domain: string, isForToday?: boolean) => void;
  updateTodoStatus: (id: string, status: TodoStatus) => void;
  updateTodoDomain: (id: string, domain: string) => void;
  toggleTodoToday: (id: string) => void;
  deleteTodo: (id: string) => void;
  addDomain: (domain: string) => void;
  deleteDomain: (domain: string) => void;
  setDueDate: (id: string, date?: Date) => void;
}

const initialDomains = [
  'Subtile',
  'Admin',
  'immo',
  'June Energy',
  'Mindelo',
  'Personal',
  'Ideas'
];

const initialTodos: Todo[] = [
  {
    id: '1',
    title: 'Review project timeline',
    status: 'in-progress',
    domain: 'Subtile',
    createdAt: new Date(),
    isForToday: true
  },
  {
    id: '2',
    title: 'Prepare monthly reports',
    status: 'todo',
    domain: 'Admin',
    createdAt: new Date(),
    isForToday: true,
    dueDate: new Date()
  }
].map(todo => ({ ...todo, isForToday: todo.isForToday || false }));

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: initialTodos,
      domains: initialDomains,
      
      addTodo: (title, domain, isForToday = false) => set((state) => ({
        todos: [...state.todos, {
          id: Date.now().toString(),
          title,
          status: 'todo',
          domain,
          createdAt: new Date(),
          isForToday
        }]
      })),

      updateTodoStatus: (id, status) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, status } : todo
        )
      })),

      updateTodoDomain: (id, domain) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, domain } : todo
        )
      })),

      toggleTodoToday: (id) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, isForToday: !todo.isForToday } : todo
        )
      })),

      setDueDate: (id, date) => set((state) => ({
        todos: state.todos.map(todo =>
          todo.id === id ? { ...todo, dueDate: date } : todo
        )
      })),

      deleteTodo: (id) => set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id)
      })),

      addDomain: (domain) => set((state) => ({
        domains: [...state.domains, domain]
      })),

      deleteDomain: (domain) => set((state) => ({
        domains: state.domains.filter(d => d !== domain),
        todos: state.todos.map(todo =>
          todo.domain === domain ? { ...todo, domain: 'Personal' } : todo
        )
      }))
    }),
    {
      name: 'todo-storage',
      partialize: (state) => ({
        todos: state.todos.map(todo => ({
          ...todo,
          createdAt: todo.createdAt.toISOString(),
          dueDate: todo.dueDate ? todo.dueDate.toISOString() : undefined
        })),
        domains: state.domains
      }),
      onRehydrateStorage: () => (state) => {
        if (state && state.todos) {
          state.todos = state.todos.map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined
          }));
        }
      }
    }
  )
);