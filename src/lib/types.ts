export interface CrewMember {
  id: string;
  name: string;
  role: string;
}

export interface Project {
  id: string;
  name: string;
  clientName: string;
  address: string;
  startDate: string;
  estimatedEndDate: string;
  budget: number; // in cents
  status: 'active' | 'completed' | 'on-hold';
  createdAt: string;
}

export interface Task {
  id: string;
  projectId: string;
  title: string;
  assigneeId: string;
  status: 'not-started' | 'in-progress' | 'done' | 'blocked';
  dueDate: string;
  createdAt: string;
}

export interface Material {
  id: string;
  projectId: string;
  name: string;
  quantity: number;
  unit: string;
  cost: number; // in cents
  purchased: boolean;
  purchasedAt?: string;
  createdAt: string;
}

export type ProjectStatus = Project['status'];
export type TaskStatus = Task['status'];
