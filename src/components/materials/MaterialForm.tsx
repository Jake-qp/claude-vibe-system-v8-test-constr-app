'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Material } from '@/lib/types';
import { parseCurrency, formatCurrency } from '@/lib/utils';

interface MaterialFormProps {
  material?: Material;
  onSubmit: (data: Omit<Material, 'id' | 'createdAt' | 'projectId'>) => void;
  onCancel: () => void;
}

export function MaterialForm({ material, onSubmit, onCancel }: MaterialFormProps) {
  const [name, setName] = useState(material?.name ?? '');
  const [quantity, setQuantity] = useState(material?.quantity?.toString() ?? '1');
  const [unit, setUnit] = useState(material?.unit ?? 'units');
  const [costDisplay, setCostDisplay] = useState(
    material ? formatCurrency(material.cost).replace('$', '') : ''
  );
  const [purchased, setPurchased] = useState(material?.purchased ?? false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      quantity: parseFloat(quantity) || 1,
      unit,
      cost: parseCurrency(costDisplay),
      purchased,
      purchasedAt: material?.purchasedAt,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Material Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g., 2x4 lumber"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          min="0"
          step="0.01"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <Input
          label="Unit"
          name="unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          placeholder="e.g., sq ft, boards, gallons"
        />
      </div>
      <Input
        label="Total Cost"
        name="cost"
        value={costDisplay}
        onChange={(e) => setCostDisplay(e.target.value)}
        placeholder="e.g., 250.00"
        required
      />
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={purchased}
          onChange={(e) => setPurchased(e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Already purchased</span>
      </label>
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">
          {material ? 'Update Material' : 'Add Material'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
