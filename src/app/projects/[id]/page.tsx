'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProjectStatusBadge, TaskStatusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { TaskForm } from '@/components/tasks/TaskForm';
import { MaterialForm } from '@/components/materials/MaterialForm';
import {
  getProject,
  updateProject,
  deleteProject,
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
  getMaterialsByProject,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  getProjectBudgetStatus,
} from '@/lib/storage';
import { formatCurrency, formatDate, formatDateShort, isOverdue, cn } from '@/lib/utils';
import { getCrewMemberName } from '@/lib/crew';
import { Project, Task, Material, TaskStatus } from '@/lib/types';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [budgetStatus, setBudgetStatus] = useState({ budget: 0, spent: 0, remaining: 0, isOverBudget: false });
  const [isLoading, setIsLoading] = useState(true);

  const [editProjectModal, setEditProjectModal] = useState(false);
  const [taskModal, setTaskModal] = useState<{ open: boolean; task?: Task }>({ open: false });
  const [materialModal, setMaterialModal] = useState<{ open: boolean; material?: Material }>({ open: false });
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'project' | 'task' | 'material'; id?: string } | null>(null);

  const loadData = useCallback(() => {
    const p = getProject(projectId);
    if (!p) {
      router.push('/projects');
      return;
    }
    setProject(p);
    setTasks(getTasksByProject(projectId).sort((a, b) =>
      new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    ));
    setMaterials(getMaterialsByProject(projectId));
    setBudgetStatus(getProjectBudgetStatus(projectId));
    setIsLoading(false);
  }, [projectId, router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleUpdateProject = (data: Omit<Project, 'id' | 'createdAt'>) => {
    updateProject(projectId, data);
    loadData();
    setEditProjectModal(false);
  };

  const handleDeleteProject = () => {
    deleteProject(projectId);
    router.push('/projects');
  };

  const handleCreateTask = (data: Omit<Task, 'id' | 'createdAt' | 'projectId'>) => {
    createTask({ ...data, projectId });
    loadData();
    setTaskModal({ open: false });
  };

  const handleUpdateTask = (data: Omit<Task, 'id' | 'createdAt' | 'projectId'>) => {
    if (taskModal.task) {
      updateTask(taskModal.task.id, data);
      loadData();
    }
    setTaskModal({ open: false });
  };

  const handleQuickStatusChange = (taskId: string, status: TaskStatus) => {
    updateTask(taskId, { status });
    loadData();
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    loadData();
    setDeleteConfirm(null);
  };

  const handleCreateMaterial = (data: Omit<Material, 'id' | 'createdAt' | 'projectId'>) => {
    createMaterial({ ...data, projectId });
    loadData();
    setMaterialModal({ open: false });
  };

  const handleUpdateMaterial = (data: Omit<Material, 'id' | 'createdAt' | 'projectId'>) => {
    if (materialModal.material) {
      updateMaterial(materialModal.material.id, data);
      loadData();
    }
    setMaterialModal({ open: false });
  };

  const handleTogglePurchased = (materialId: string, purchased: boolean) => {
    updateMaterial(materialId, { purchased });
    loadData();
  };

  const handleDeleteMaterial = (materialId: string) => {
    deleteMaterial(materialId);
    loadData();
    setDeleteConfirm(null);
  };

  if (isLoading || !project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-64" />
          <div className="h-32 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  const overdueTaskCount = tasks.filter((t) => t.status !== 'done' && isOverdue(t.dueDate)).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/projects" className="text-blue-600 hover:text-blue-800 text-sm mb-2 inline-flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{project.name}</h1>
              <ProjectStatusBadge status={project.status} />
            </div>
            <p className="text-gray-500">{project.clientName}</p>
            <p className="text-sm text-gray-400">{project.address}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => setEditProjectModal(true)}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => setDeleteConfirm({ type: 'project' })}>
              Delete
            </Button>
          </div>
        </div>
      </div>

      {/* Project Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <p className="text-sm text-gray-500 mb-1">Timeline</p>
          <p className="font-medium">
            {formatDateShort(project.startDate)} - {formatDateShort(project.estimatedEndDate)}
          </p>
          {overdueTaskCount > 0 && (
            <p className="text-sm text-red-600 mt-1">{overdueTaskCount} overdue tasks</p>
          )}
        </Card>
        <Card>
          <p className="text-sm text-gray-500 mb-1">Budget</p>
          <p className="font-medium">{formatCurrency(budgetStatus.budget)}</p>
        </Card>
        <Card className={budgetStatus.isOverBudget ? 'border-red-300 bg-red-50' : ''}>
          <p className="text-sm text-gray-500 mb-1">Spent on Materials</p>
          <p className={cn('font-medium', budgetStatus.isOverBudget && 'text-red-600')}>
            {formatCurrency(budgetStatus.spent)}
          </p>
          <p className={cn('text-sm', budgetStatus.isOverBudget ? 'text-red-500' : 'text-gray-400')}>
            {budgetStatus.isOverBudget ? 'Over budget by ' : 'Remaining: '}
            {formatCurrency(Math.abs(budgetStatus.remaining))}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Tasks</CardTitle>
            <Button size="sm" onClick={() => setTaskModal({ open: true })}>
              Add Task
            </Button>
          </CardHeader>
          {tasks.length === 0 ? (
            <EmptyState
              title="No tasks yet"
              description="Add tasks to track work on this project"
              action={
                <Button onClick={() => setTaskModal({ open: true })}>Add Task</Button>
              }
            />
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => {
                const taskOverdue = task.status !== 'done' && isOverdue(task.dueDate);
                return (
                  <div
                    key={task.id}
                    className={cn(
                      'p-3 rounded-lg border',
                      taskOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200 bg-gray-50'
                    )}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-500">
                          {getCrewMemberName(task.assigneeId)} &middot; Due {formatDateShort(task.dueDate)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setTaskModal({ open: true, task })}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'task', id: task.id })}
                          className="p-1 hover:bg-red-100 rounded"
                        >
                          <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {(['not-started', 'in-progress', 'done', 'blocked'] as TaskStatus[]).map((status) => (
                        <button
                          key={status}
                          onClick={() => handleQuickStatusChange(task.id, status)}
                          className={cn(
                            'px-2 py-1 text-xs rounded-full transition-colors',
                            task.status === status
                              ? 'ring-2 ring-offset-1 ring-blue-500'
                              : 'opacity-60 hover:opacity-100'
                          )}
                        >
                          <TaskStatusBadge status={status} />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Materials */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Materials</CardTitle>
            <Button size="sm" onClick={() => setMaterialModal({ open: true })}>
              Add Material
            </Button>
          </CardHeader>
          {materials.length === 0 ? (
            <EmptyState
              title="No materials yet"
              description="Track materials and costs for this project"
              action={
                <Button onClick={() => setMaterialModal({ open: true })}>Add Material</Button>
              }
            />
          ) : (
            <div className="space-y-3">
              {materials.map((material) => (
                <div
                  key={material.id}
                  className="p-3 rounded-lg border border-gray-200 bg-gray-50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePurchased(material.id, !material.purchased)}
                          className={cn(
                            'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0',
                            material.purchased
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-gray-400'
                          )}
                        >
                          {material.purchased && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <p className={cn('font-medium', material.purchased && 'text-gray-500 line-through')}>
                          {material.name}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 ml-7">
                        {material.quantity} {material.unit} &middot; {formatCurrency(material.cost)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setMaterialModal({ open: true, material })}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ type: 'material', id: material.id })}
                        className="p-1 hover:bg-red-100 rounded"
                      >
                        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Materials Cost:</span>
                  <span className="font-semibold">{formatCurrency(materials.reduce((sum, m) => sum + m.cost, 0))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Purchased:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(materials.filter((m) => m.purchased).reduce((sum, m) => sum + m.cost, 0))}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Edit Project Modal */}
      <Modal
        isOpen={editProjectModal}
        onClose={() => setEditProjectModal(false)}
        title="Edit Project"
      >
        <ProjectForm
          project={project}
          onSubmit={handleUpdateProject}
          onCancel={() => setEditProjectModal(false)}
        />
      </Modal>

      {/* Task Modal */}
      <Modal
        isOpen={taskModal.open}
        onClose={() => setTaskModal({ open: false })}
        title={taskModal.task ? 'Edit Task' : 'Add Task'}
      >
        <TaskForm
          task={taskModal.task}
          onSubmit={taskModal.task ? handleUpdateTask : handleCreateTask}
          onCancel={() => setTaskModal({ open: false })}
        />
      </Modal>

      {/* Material Modal */}
      <Modal
        isOpen={materialModal.open}
        onClose={() => setMaterialModal({ open: false })}
        title={materialModal.material ? 'Edit Material' : 'Add Material'}
      >
        <MaterialForm
          material={materialModal.material}
          onSubmit={materialModal.material ? handleUpdateMaterial : handleCreateMaterial}
          onCancel={() => setMaterialModal({ open: false })}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        title={`Delete ${deleteConfirm?.type === 'project' ? 'Project' : deleteConfirm?.type === 'task' ? 'Task' : 'Material'}?`}
      >
        <p className="text-gray-600 mb-4">
          {deleteConfirm?.type === 'project'
            ? 'This will permanently delete this project and all its tasks and materials.'
            : `This will permanently delete this ${deleteConfirm?.type}.`}
        </p>
        <div className="flex gap-3">
          <Button
            variant="danger"
            className="flex-1"
            onClick={() => {
              if (deleteConfirm?.type === 'project') {
                handleDeleteProject();
              } else if (deleteConfirm?.type === 'task' && deleteConfirm.id) {
                handleDeleteTask(deleteConfirm.id);
              } else if (deleteConfirm?.type === 'material' && deleteConfirm.id) {
                handleDeleteMaterial(deleteConfirm.id);
              }
            }}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
