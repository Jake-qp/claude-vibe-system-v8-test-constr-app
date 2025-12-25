import { cn } from '@/lib/utils';
import { ProjectStatus, TaskStatus } from '@/lib/types';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-gray-100 text-gray-800',
        variant === 'success' && 'bg-green-100 text-green-800',
        variant === 'warning' && 'bg-yellow-100 text-yellow-800',
        variant === 'danger' && 'bg-red-100 text-red-800',
        variant === 'info' && 'bg-blue-100 text-blue-800',
        className
      )}
    >
      {children}
    </span>
  );
}

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const variants: Record<ProjectStatus, BadgeProps['variant']> = {
    active: 'success',
    completed: 'default',
    'on-hold': 'warning',
  };
  const labels: Record<ProjectStatus, string> = {
    active: 'Active',
    completed: 'Completed',
    'on-hold': 'On Hold',
  };
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const variants: Record<TaskStatus, BadgeProps['variant']> = {
    'not-started': 'default',
    'in-progress': 'info',
    done: 'success',
    blocked: 'danger',
  };
  const labels: Record<TaskStatus, string> = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    done: 'Done',
    blocked: 'Blocked',
  };
  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}
