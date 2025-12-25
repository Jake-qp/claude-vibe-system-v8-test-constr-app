import { Project, Task, Material } from './types';
import { generateId } from './utils';

const KEYS = {
  projects: 'crewboard_projects',
  tasks: 'crewboard_tasks',
  materials: 'crewboard_materials',
} as const;

function getStorage<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function setStorage<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// Projects
export function getProjects(): Project[] {
  return getStorage<Project>(KEYS.projects);
}

export function getProject(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

export function createProject(
  data: Omit<Project, 'id' | 'createdAt'>
): Project {
  const project: Project = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  const projects = getProjects();
  projects.push(project);
  setStorage(KEYS.projects, projects);
  return project;
}

export function updateProject(
  id: string,
  data: Partial<Omit<Project, 'id' | 'createdAt'>>
): Project | undefined {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  projects[index] = { ...projects[index], ...data };
  setStorage(KEYS.projects, projects);
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  setStorage(KEYS.projects, filtered);
  // Also delete related tasks and materials
  const tasks = getTasks().filter((t) => t.projectId !== id);
  setStorage(KEYS.tasks, tasks);
  const materials = getMaterials().filter((m) => m.projectId !== id);
  setStorage(KEYS.materials, materials);
  return true;
}

// Tasks
export function getTasks(): Task[] {
  return getStorage<Task>(KEYS.tasks);
}

export function getTasksByProject(projectId: string): Task[] {
  return getTasks().filter((t) => t.projectId === projectId);
}

export function getTask(id: string): Task | undefined {
  return getTasks().find((t) => t.id === id);
}

export function createTask(data: Omit<Task, 'id' | 'createdAt'>): Task {
  const task: Task = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  const tasks = getTasks();
  tasks.push(task);
  setStorage(KEYS.tasks, tasks);
  return task;
}

export function updateTask(
  id: string,
  data: Partial<Omit<Task, 'id' | 'createdAt'>>
): Task | undefined {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  tasks[index] = { ...tasks[index], ...data };
  setStorage(KEYS.tasks, tasks);
  return tasks[index];
}

export function deleteTask(id: string): boolean {
  const tasks = getTasks();
  const filtered = tasks.filter((t) => t.id !== id);
  if (filtered.length === tasks.length) return false;
  setStorage(KEYS.tasks, filtered);
  return true;
}

// Materials
export function getMaterials(): Material[] {
  return getStorage<Material>(KEYS.materials);
}

export function getMaterialsByProject(projectId: string): Material[] {
  return getMaterials().filter((m) => m.projectId === projectId);
}

export function getMaterial(id: string): Material | undefined {
  return getMaterials().find((m) => m.id === id);
}

export function createMaterial(
  data: Omit<Material, 'id' | 'createdAt'>
): Material {
  const material: Material = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  const materials = getMaterials();
  materials.push(material);
  setStorage(KEYS.materials, materials);
  return material;
}

export function updateMaterial(
  id: string,
  data: Partial<Omit<Material, 'id' | 'createdAt'>>
): Material | undefined {
  const materials = getMaterials();
  const index = materials.findIndex((m) => m.id === id);
  if (index === -1) return undefined;

  // If marking as purchased, set purchasedAt
  if (data.purchased === true && !materials[index].purchasedAt) {
    data.purchasedAt = new Date().toISOString();
  }
  // If unmarking as purchased, clear purchasedAt
  if (data.purchased === false) {
    data.purchasedAt = undefined;
  }

  materials[index] = { ...materials[index], ...data };
  setStorage(KEYS.materials, materials);
  return materials[index];
}

export function deleteMaterial(id: string): boolean {
  const materials = getMaterials();
  const filtered = materials.filter((m) => m.id !== id);
  if (filtered.length === materials.length) return false;
  setStorage(KEYS.materials, filtered);
  return true;
}

// Aggregations
export function getOverdueTasks(): (Task & { projectName: string })[] {
  const tasks = getTasks();
  const projects = getProjects();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return tasks
    .filter((t) => {
      if (t.status === 'done') return false;
      const due = new Date(t.dueDate);
      due.setHours(0, 0, 0, 0);
      return due < today;
    })
    .map((t) => ({
      ...t,
      projectName: projects.find((p) => p.id === t.projectId)?.name ?? 'Unknown',
    }))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}

export function getProjectBudgetStatus(projectId: string): {
  budget: number;
  spent: number;
  remaining: number;
  isOverBudget: boolean;
} {
  const project = getProject(projectId);
  const materials = getMaterialsByProject(projectId);
  const spent = materials
    .filter((m) => m.purchased)
    .reduce((sum, m) => sum + m.cost, 0);
  const budget = project?.budget ?? 0;

  return {
    budget,
    spent,
    remaining: budget - spent,
    isOverBudget: spent > budget,
  };
}

export function getMonthlyMaterialsCost(): number {
  const materials = getMaterials();
  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  return materials
    .filter((m) => {
      if (!m.purchased || !m.purchasedAt) return false;
      const date = new Date(m.purchasedAt);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    })
    .reduce((sum, m) => sum + m.cost, 0);
}

export function getActiveProjectsCount(): number {
  return getProjects().filter((p) => p.status === 'active').length;
}

// Seed sample data for demo
export function seedSampleData(): void {
  if (getProjects().length > 0) return; // Don't seed if data exists

  const now = new Date();
  const dayMs = 24 * 60 * 60 * 1000;

  // Create sample projects
  const project1 = createProject({
    name: 'Johnson Kitchen Remodel',
    clientName: 'Bob Johnson',
    address: '123 Oak Street, Springfield',
    startDate: new Date(now.getTime() - 14 * dayMs).toISOString(),
    estimatedEndDate: new Date(now.getTime() + 21 * dayMs).toISOString(),
    budget: 2500000, // $25,000
    status: 'active',
  });

  const project2 = createProject({
    name: '456 Maple Ave Deck Build',
    clientName: 'Sarah Williams',
    address: '456 Maple Avenue, Springfield',
    startDate: new Date(now.getTime() - 7 * dayMs).toISOString(),
    estimatedEndDate: new Date(now.getTime() + 14 * dayMs).toISOString(),
    budget: 800000, // $8,000
    status: 'active',
  });

  const project3 = createProject({
    name: 'Miller Bathroom Renovation',
    clientName: 'Tom Miller',
    address: '789 Pine Road, Springfield',
    startDate: new Date(now.getTime() + 7 * dayMs).toISOString(),
    estimatedEndDate: new Date(now.getTime() + 28 * dayMs).toISOString(),
    budget: 1200000, // $12,000
    status: 'active',
  });

  // Tasks for Kitchen Remodel
  createTask({
    projectId: project1.id,
    title: 'Demo old cabinets',
    assigneeId: 'dave',
    status: 'done',
    dueDate: new Date(now.getTime() - 10 * dayMs).toISOString(),
  });
  createTask({
    projectId: project1.id,
    title: 'Rough plumbing',
    assigneeId: 'tony',
    status: 'done',
    dueDate: new Date(now.getTime() - 7 * dayMs).toISOString(),
  });
  createTask({
    projectId: project1.id,
    title: 'Electrical rough-in',
    assigneeId: 'sarah',
    status: 'in-progress',
    dueDate: new Date(now.getTime() - 2 * dayMs).toISOString(), // Overdue!
  });
  createTask({
    projectId: project1.id,
    title: 'Install new cabinets',
    assigneeId: 'mike',
    status: 'not-started',
    dueDate: new Date(now.getTime() + 5 * dayMs).toISOString(),
  });
  createTask({
    projectId: project1.id,
    title: 'Install countertops',
    assigneeId: 'mike',
    status: 'not-started',
    dueDate: new Date(now.getTime() + 10 * dayMs).toISOString(),
  });
  createTask({
    projectId: project1.id,
    title: 'Final plumbing connections',
    assigneeId: 'tony',
    status: 'not-started',
    dueDate: new Date(now.getTime() + 15 * dayMs).toISOString(),
  });

  // Tasks for Deck Build
  createTask({
    projectId: project2.id,
    title: 'Pour concrete footings',
    assigneeId: 'jose',
    status: 'done',
    dueDate: new Date(now.getTime() - 5 * dayMs).toISOString(),
  });
  createTask({
    projectId: project2.id,
    title: 'Frame deck structure',
    assigneeId: 'mike',
    status: 'in-progress',
    dueDate: new Date(now.getTime() - 1 * dayMs).toISOString(), // Overdue!
  });
  createTask({
    projectId: project2.id,
    title: 'Install decking boards',
    assigneeId: 'jose',
    status: 'not-started',
    dueDate: new Date(now.getTime() + 7 * dayMs).toISOString(),
  });
  createTask({
    projectId: project2.id,
    title: 'Build railings',
    assigneeId: 'mike',
    status: 'not-started',
    dueDate: new Date(now.getTime() + 12 * dayMs).toISOString(),
  });

  // Tasks for Bathroom
  createTask({
    projectId: project3.id,
    title: 'Initial walkthrough with client',
    assigneeId: 'pete',
    status: 'done',
    dueDate: new Date(now.getTime() - 3 * dayMs).toISOString(),
  });
  createTask({
    projectId: project3.id,
    title: 'Order fixtures and tile',
    assigneeId: 'pete',
    status: 'not-started',
    dueDate: new Date(now.getTime() + 3 * dayMs).toISOString(),
  });

  // Materials for Kitchen Remodel
  const m1 = createMaterial({
    projectId: project1.id,
    name: 'Kitchen cabinets (set)',
    quantity: 1,
    unit: 'set',
    cost: 850000, // $8,500
    purchased: true,
  });
  updateMaterial(m1.id, { purchasedAt: new Date(now.getTime() - 5 * dayMs).toISOString() });

  createMaterial({
    projectId: project1.id,
    name: 'Granite countertop',
    quantity: 45,
    unit: 'sq ft',
    cost: 315000, // $3,150
    purchased: false,
  });

  const m2 = createMaterial({
    projectId: project1.id,
    name: 'Plumbing supplies',
    quantity: 1,
    unit: 'lot',
    cost: 42500, // $425
    purchased: true,
  });
  updateMaterial(m2.id, { purchasedAt: new Date(now.getTime() - 8 * dayMs).toISOString() });

  createMaterial({
    projectId: project1.id,
    name: 'Electrical supplies',
    quantity: 1,
    unit: 'lot',
    cost: 28000, // $280
    purchased: false,
  });

  // Materials for Deck
  const m3 = createMaterial({
    projectId: project2.id,
    name: 'Pressure treated lumber',
    quantity: 40,
    unit: 'boards',
    cost: 120000, // $1,200
    purchased: true,
  });
  updateMaterial(m3.id, { purchasedAt: new Date(now.getTime() - 6 * dayMs).toISOString() });

  const m4 = createMaterial({
    projectId: project2.id,
    name: 'Composite decking',
    quantity: 200,
    unit: 'sq ft',
    cost: 280000, // $2,800
    purchased: true,
  });
  updateMaterial(m4.id, { purchasedAt: now.toISOString() }); // Purchased today

  createMaterial({
    projectId: project2.id,
    name: 'Deck screws and hardware',
    quantity: 1,
    unit: 'lot',
    cost: 15000, // $150
    purchased: false,
  });

  createMaterial({
    projectId: project2.id,
    name: 'Railing system',
    quantity: 30,
    unit: 'linear ft',
    cost: 75000, // $750
    purchased: false,
  });
}
