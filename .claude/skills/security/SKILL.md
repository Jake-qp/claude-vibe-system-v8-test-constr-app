---
name: security
description: Security patterns and enforcement
triggers:
  - Authentication features
  - Payment processing
  - PII handling
  - API endpoints
generates: docs/SECURITY.md
---

# Security Skill

**This skill BLOCKS completion if checks fail.**

## When This Skill Activates

- Any auth implementation
- Payment processing
- Handling personal data
- Creating API endpoints
- Before /launch

## Security Checklist

### Authentication
- [ ] Passwords hashed (bcrypt, argon2)
- [ ] Session tokens secure (httpOnly, secure, sameSite)
- [ ] Login rate limiting
- [ ] Password reset flow secure

### Authorization
- [ ] Every route checks permissions
- [ ] No authorization in frontend only
- [ ] Principle of least privilege
- [ ] Role checks at data layer

### Data Protection
- [ ] No secrets in code or logs
- [ ] Encryption at rest for PII
- [ ] HTTPS enforced
- [ ] Input validation on all endpoints

### API Security
- [ ] Authentication required
- [ ] Rate limiting
- [ ] Input validation/sanitization
- [ ] Error messages don't leak info

## Security Patterns

```typescript
// ✅ Good: Auth check in API route
export async function GET(request: Request) {
  const user = await getSession(request);
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }
  // ... rest of handler
}

// ❌ Bad: Auth check only in frontend
```

## If Security Check Fails

1. Mark issue as [REVIEW] in .tasks
2. Do not proceed with /launch
3. Document in docs/SECURITY.md what needs fixing

## Exit Criteria

- [ ] All checklist items pass OR
- [ ] Failures documented with [REVIEW] tag
- [ ] No secrets in codebase
- [ ] Auth tested manually
