'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Task, TaskStatus } from '@/lib/types';
import { CREW_MEMBERS } from '@/lib/crew';
import { toISODateString } from '@/lib/utils';

interface TaskFormProps {
  task?: Task;
  onSubmit: (data: Omit<Task, 'id' | 'createdAt' | 'projectId'>) => void;
  onCancel: () => void;
}

const statusOptions = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'blocked', label: 'Blocked' },
];

const crewOptions = CREW_MEMBERS.map((m) => ({
  value: m.id,
  label: `${m.name} (${m.role})`,
}));

export function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [assigneeId, setAssigneeId] = useState(task?.assigneeId ?? CREW_MEMBERS[0].id);
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'not-started');
  const [dueDate, setDueDate] = useState(
    task?.dueDate?.split('T')[0] ?? toISODateString(new Date())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      assigneeId,
      status,
      dueDate: new Date(dueDate).toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Task Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g., Demo old cabinets"
        required
      />
      <Select
        label="Assigned To"
        name="assigneeId"
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
        options={crewOptions}
      />
      <Select
        label="Status"
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as TaskStatus)}
        options={statusOptions}
      />
      <Input
        label="Due Date"
        name="dueDate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">
          {task ? 'Update Task' : 'Add Task'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
