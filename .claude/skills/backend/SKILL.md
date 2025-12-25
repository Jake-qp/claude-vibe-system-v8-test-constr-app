---
name: backend
description: Backend and API development patterns
triggers:
  - API endpoint creation
  - Business logic
  - Server-side code
generates: docs/API-CONTRACTS.md
---

# Backend Skill

Build robust APIs and backend services.

## When This Skill Activates

- Creating API endpoints
- Implementing business logic
- Server-side data processing

## API Structure

### Route Handler Pattern
```typescript
// app/api/users/route.ts
export async function GET(request: Request) {
  try {
    // 1. Auth check
    const user = await getSession(request);
    if (!user) return unauthorized();
    
    // 2. Input validation
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    
    // 3. Business logic
    const users = await getUsers({ page });
    
    // 4. Response
    return Response.json(users);
  } catch (error) {
    return handleError(error);
  }
}
```

### API Documentation

Document in docs/API-CONTRACTS.md:
```markdown
## GET /api/users

### Request
- Auth: Bearer token required
- Query: `?page=1&limit=20`

### Response
```json
{
  "users": [...],
  "pagination": { "page": 1, "total": 100 }
}
```

### Errors
- 401: Not authenticated
- 403: Not authorized
```

## Best Practices

- [ ] Every endpoint authenticated
- [ ] Input validation before processing
- [ ] Business logic in separate functions
- [ ] Consistent error handling
- [ ] Pagination for lists
- [ ] Rate limiting

## Exit Criteria

- [ ] API documented
- [ ] All endpoints tested
- [ ] Auth/authz implemented
- [ ] Error handling consistent
