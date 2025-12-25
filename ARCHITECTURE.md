# CrewBoard - Construction Project Management

> Simple project management for Pete's remodeling business. Track projects, tasks, materials, and budgets locally.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Storage:** Browser localStorage (JSON)
- **Styling:** Tailwind CSS

## Directory Structure

```
src/
  app/                    # Next.js App Router pages
    page.tsx              # Dashboard (home)
    projects/
      page.tsx            # Projects list
      [id]/
        page.tsx          # Project detail
        tasks/page.tsx    # Task management
        materials/page.tsx # Materials tracking
    layout.tsx            # Root layout with nav
  components/
    ui/                   # Reusable UI components
    projects/             # Project-specific components
    tasks/                # Task-specific components
    materials/            # Material-specific components
  lib/
    types.ts              # TypeScript interfaces
    storage.ts            # localStorage CRUD operations
    utils.ts              # Helper functions (dates, currency)
    crew.ts               # Crew member data
```

## Data Models

### Project
```typescript
{
  id: string
  name: string
  clientName: string
  address: string
  startDate: string (ISO)
  estimatedEndDate: string (ISO)
  budget: number (cents)
  status: 'active' | 'completed' | 'on-hold'
  createdAt: string (ISO)
}
```

### Task
```typescript
{
  id: string
  projectId: string
  title: string
  assignee: CrewMember
  status: 'not-started' | 'in-progress' | 'done' | 'blocked'
  dueDate: string (ISO)
  createdAt: string (ISO)
}
```

### Material
```typescript
{
  id: string
  projectId: string
  name: string
  quantity: number
  unit: string
  cost: number (cents)
  purchased: boolean
  createdAt: string (ISO)
}
```

### CrewMember
```typescript
{
  id: string
  name: string
  role: string
}
```

## Key Patterns

### Storage
- All data stored in localStorage under keys: `crewboard_projects`, `crewboard_tasks`, `crewboard_materials`
- Data stored as JSON arrays
- IDs generated with crypto.randomUUID()
- Amounts stored in cents to avoid floating-point issues

### UI Patterns
- Mobile-first responsive design
- Simple card-based layouts
- Status badges with color coding
- Forms use controlled components
- Navigation via sidebar (desktop) / bottom nav (mobile)

### Calculations
- **Budget vs Actual:** Sum of purchased materials cost vs project budget
- **Overdue Detection:** Tasks where dueDate < today AND status !== 'done'
- **Monthly Materials:** Sum materials where purchaseDate in current month

## Crew Members (Pre-loaded)

| ID | Name | Role |
|----|------|------|
| mike | Mike | Lead Carpenter |
| jose | Jose | Apprentice |
| tony | Tony | Plumber |
| sarah | Sarah | Electrician |
| dave | Dave | General Labor |
| pete | Pete | Owner |
