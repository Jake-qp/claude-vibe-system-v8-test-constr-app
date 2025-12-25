---
name: error-handling
description: Systematic error handling patterns
triggers:
  - Any feature implementation
  - After happy path works
  - "add error handling"
generates: null
---

# Error Handling Skill

Handle errors gracefully. Users should never see stack traces.

## When This Skill Activates

- After happy path implementation
- When adding try/catch blocks
- Before marking feature complete

## Error Categories

| Category | HTTP Status | User Message | Logging |
|----------|-------------|--------------|---------|
| Validation | 400 | Field-specific errors | Info |
| Authentication | 401 | "Please log in" | Warning |
| Authorization | 403 | "Access denied" | Warning |
| Not Found | 404 | "Not found" | Info |
| Rate Limit | 429 | "Too many requests" | Warning |
| Server Error | 500 | "Something went wrong" | Error |

## Error Response Pattern

```typescript
interface ErrorResponse {
  error: string;           // User-friendly message
  code: string;            // Machine-readable code
  details?: FieldError[];  // For validation errors
  requestId?: string;      // For debugging
}

export function handleError(error: unknown): Response {
  console.error('Error:', error);
  
  if (error instanceof ValidationError) {
    return Response.json({
      error: 'Please check your input',
      code: 'VALIDATION_ERROR',
      details: error.fields,
    }, { status: 400 });
  }
  
  if (error instanceof AuthError) {
    return Response.json({
      error: 'Please log in again',
      code: 'UNAUTHORIZED',
    }, { status: 401 });
  }
  
  return Response.json({
    error: 'Something went wrong. Please try again.',
    code: 'SERVER_ERROR',
    requestId: generateRequestId(),
  }, { status: 500 });
}
```

## Frontend Error Handling

```typescript
// Error boundary for React
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    // Log to error tracking
    console.error(error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback onRetry={() => this.setState({ hasError: false })} />;
    }
    return this.props.children;
  }
}
```

## Exit Criteria

- [ ] All API calls have try/catch
- [ ] Error responses follow standard format
- [ ] User never sees stack traces
- [ ] Retry logic for transient failures
