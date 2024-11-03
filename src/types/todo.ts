export type TodoStatus = 'todo' | 'in-progress' | 'done';

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  domain: string;
  createdAt: Date;
  dueDate?: Date;
  isForToday: boolean;
}

export type ViewMode = 'list' | 'kanban' | 'domain' | 'today';