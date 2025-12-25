'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProjectStatusBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { EmptyState } from '@/components/ui/EmptyState';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { getProjects, createProject, getTasksByProject } from '@/lib/storage';
import { formatCurrency, formatDate, isOverdue } from '@/lib/utils';
import { Project } from '@/lib/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadProjects = () => {
    setProjects(getProjects().sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  };

  useEffect(() => {
    loadProjects();
    setIsLoading(false);
  }, []);

  const handleCreate = (data: Omit<Project, 'id' | 'createdAt'>) => {
    createProject(data);
    loadProjects();
    setIsModalOpen(false);
  };

  const getProjectOverdueCount = (projectId: string): number => {
    const tasks = getTasksByProject(projectId);
    return tasks.filter((t) => t.status !== 'done' && isOverdue(t.dueDate)).length;
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Projects</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <EmptyState
            title="No projects yet"
            description="Create your first project to start tracking jobs"
            action={
              <Button onClick={() => setIsModalOpen(true)}>Create Project</Button>
            }
          />
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => {
            const overdueCount = getProjectOverdueCount(project.id);
            return (
              <Link key={project.id} href={`/projects/${project.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-semibold text-gray-900 truncate">
                          {project.name}
                        </h2>
                        <ProjectStatusBadge status={project.status} />
                        {overdueCount > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {overdueCount} overdue
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 truncate">{project.clientName}</p>
                      <p className="text-sm text-gray-400 truncate">{project.address}</p>
                    </div>
                    <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 sm:gap-1 shrink-0">
                      <p className="text-lg font-semibold text-gray-900">
                        {formatCurrency(project.budget)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Due {formatDate(project.estimatedEndDate)}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="New Project"
      >
        <ProjectForm
          onSubmit={handleCreate}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
