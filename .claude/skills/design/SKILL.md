---
name: design
description: Design APIs and component contracts
triggers:
  - Before implementation
  - API design
  - Component interfaces
generates: null
---

# Design Skill

Design clean interfaces before implementation.

## When This Skill Activates

- Designing new API endpoints
- Planning component interfaces
- Defining data shapes

## API Design Checklist

### REST Endpoints
- [ ] Consistent naming (plural nouns, kebab-case)
- [ ] Proper HTTP methods (GET, POST, PUT, DELETE)
- [ ] Sensible status codes
- [ ] Pagination for lists
- [ ] Error response format defined

### Request/Response Shapes
```typescript
// Define types first
interface CreateUserRequest {
  email: string;
  password: string;
}

interface CreateUserResponse {
  id: string;
  email: string;
  createdAt: string;
}

interface ErrorResponse {
  error: string;
  code: string;
  details?: string[];
}
```

## Component Design

For UI components:
- [ ] Props interface defined
- [ ] Default props specified
- [ ] Events/callbacks typed
- [ ] Edge states handled (loading, error, empty)

## Exit Criteria

- [ ] All interfaces typed
- [ ] Edge cases considered
- [ ] Consistent with existing patterns
