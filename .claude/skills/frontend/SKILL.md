---
name: frontend
description: Frontend development patterns
triggers:
  - React/Vue/Angular work
  - State management
  - Data fetching
generates: null
---

# Frontend Skill

Build solid frontend applications.

## When This Skill Activates

- Component development
- State management decisions
- Data fetching implementation

## Component Patterns

### Component Structure
```typescript
// Component file
export function MyComponent({ prop1, prop2 }: Props) {
  // 1. Hooks at top
  const [state, setState] = useState();
  const router = useRouter();
  
  // 2. Derived values
  const computed = useMemo(() => ..., [dep]);
  
  // 3. Effects
  useEffect(() => { ... }, [dep]);
  
  // 4. Handlers
  const handleClick = () => { ... };
  
  // 5. Early returns for loading/error
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  
  // 6. Main render
  return ( ... );
}
```

### State Management

| Complexity | Solution |
|------------|----------|
| Local | useState |
| Shared (small) | Context |
| Complex | Zustand/Redux |
| Server | React Query/SWR |

### Data Fetching

```typescript
// Use React Query pattern
function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(r => r.json()),
  });
}
```

## Common Mistakes

- ❌ Fetching in useEffect without cleanup
- ❌ State in wrong place (prop drilling)
- ❌ Not handling loading/error states
- ❌ Inline object props (causes re-renders)

## Exit Criteria

- [ ] Components are focused (single responsibility)
- [ ] State is in right place
- [ ] Loading/error states handled
- [ ] No prop drilling >2 levels
