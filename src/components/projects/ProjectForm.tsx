'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Project, ProjectStatus } from '@/lib/types';
import { toISODateString, parseCurrency, formatCurrency } from '@/lib/utils';

interface ProjectFormProps {
  project?: Project;
  onSubmit: (data: Omit<Project, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'on-hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
];

export function ProjectForm({ project, onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState(project?.name ?? '');
  const [clientName, setClientName] = useState(project?.clientName ?? '');
  const [address, setAddress] = useState(project?.address ?? '');
  const [startDate, setStartDate] = useState(
    project?.startDate?.split('T')[0] ?? toISODateString(new Date())
  );
  const [estimatedEndDate, setEstimatedEndDate] = useState(
    project?.estimatedEndDate?.split('T')[0] ?? ''
  );
  const [budgetDisplay, setBudgetDisplay] = useState(
    project ? formatCurrency(project.budget).replace('$', '') : ''
  );
  const [status, setStatus] = useState<ProjectStatus>(project?.status ?? 'active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      clientName,
      address,
      startDate: new Date(startDate).toISOString(),
      estimatedEndDate: new Date(estimatedEndDate).toISOString(),
      budget: parseCurrency(budgetDisplay),
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Project Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., Johnson Kitchen Remodel"
        required
      />
      <Input
        label="Client Name"
        name="clientName"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        placeholder="e.g., John Johnson"
        required
      />
      <Input
        label="Address"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="e.g., 123 Main St, Springfield"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Date"
          name="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <Input
          label="End Date (Est.)"
          name="estimatedEndDate"
          type="date"
          value={estimatedEndDate}
          onChange={(e) => setEstimatedEndDate(e.target.value)}
          required
        />
      </div>
      <Input
        label="Budget"
        name="budget"
        value={budgetDisplay}
        onChange={(e) => setBudgetDisplay(e.target.value)}
        placeholder="e.g., 15000"
        required
      />
      <Select
        label="Status"
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as ProjectStatus)}
        options={statusOptions}
      />
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">
          {project ? 'Update Project' : 'Create Project'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
