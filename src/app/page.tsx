'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import {
  getProjects,
  getActiveProjectsCount,
  getOverdueTasks,
  getMonthlyMaterialsCost,
  seedSampleData,
} from '@/lib/storage';
import { formatCurrency, formatDateShort } from '@/lib/utils';
import { getCrewMemberName } from '@/lib/crew';
import { Project, Task } from '@/lib/types';

export default function Dashboard() {
  const [activeCount, setActiveCount] = useState(0);
  const [overdueTasks, setOverdueTasks] = useState<(Task & { projectName: string })[]>([]);
  const [monthlySpend, setMonthlySpend] = useState(0);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNoData, setHasNoData] = useState(false);

  const loadData = () => {
    const projects = getProjects();
    setHasNoData(projects.length === 0);
    setActiveCount(getActiveProjectsCount());
    setOverdueTasks(getOverdueTasks());
    setMonthlySpend(getMonthlyMaterialsCost());
    setRecentProjects(
      projects
        .filter((p) => p.status === 'active')
        .slice(0, 5)
    );
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLoadSampleData = () => {
    seedSampleData();
    loadData();
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome back, Pete</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 sm:mb-8">
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Projects</p>
              <p className="text-2xl font-bold text-gray-900">{activeCount}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${overdueTasks.length > 0 ? 'bg-red-100' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
              <svg className={`w-6 h-6 ${overdueTasks.length > 0 ? 'text-red-600' : 'text-green-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue Tasks</p>
              <p className={`text-2xl font-bold ${overdueTasks.length > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {overdueTasks.length}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Materials This Month</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(monthlySpend)}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overdue Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Overdue Tasks</CardTitle>
          </CardHeader>
          {overdueTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-12 h-12 mx-auto text-green-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>All caught up! No overdue tasks.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {overdueTasks.slice(0, 5).map((task) => (
                <Link
                  key={task.id}
                  href={`/projects/${task.projectId}`}
                  className="block p-3 rounded-lg bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{task.title}</p>
                      <p className="text-sm text-gray-500 truncate">{task.projectName}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium text-red-600">
                        Due {formatDateShort(task.dueDate)}
                      </p>
                      <p className="text-xs text-gray-500">{getCrewMemberName(task.assigneeId)}</p>
                    </div>
                  </div>
                </Link>
              ))}
              {overdueTasks.length > 5 && (
                <p className="text-sm text-gray-500 text-center pt-2">
                  +{overdueTasks.length - 5} more overdue tasks
                </p>
              )}
            </div>
          )}
        </Card>

        {/* Active Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active Projects</CardTitle>
            <Link href="/projects">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          {recentProjects.length === 0 ? (
            <EmptyState
              title="No active projects"
              description="Create your first project to get started"
              action={
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href="/projects">
                    <Button>Add Project</Button>
                  </Link>
                  {hasNoData && (
                    <Button variant="secondary" onClick={handleLoadSampleData}>
                      Load Sample Data
                    </Button>
                  )}
                </div>
              }
            />
          ) : (
            <div className="space-y-3">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{project.name}</p>
                      <p className="text-sm text-gray-500 truncate">{project.clientName}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm text-gray-500">
                        Due {formatDateShort(project.estimatedEndDate)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
