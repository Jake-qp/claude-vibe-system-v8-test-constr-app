---
name: tdd
description: Test-Driven Development workflow
triggers:
  - /build implementation phase
  - Writing new code
  - Iron Law 1 enforcement
generates: null
---

# TDD Skill

**Iron Law 1: No Production Code Without a Failing Test First**

## TDD Cycle

```
┌─────────────────────────────────────────┐
│  1. Write failing test                  │
│           ↓                             │
│  2. Verify it fails (for right reason)  │
│           ↓                             │
│  3. Write minimal code to pass          │
│           ↓                             │
│  4. Run test - verify it passes         │
│           ↓                             │
│  5. Refactor if needed                  │
│           ↓                             │
│  6. Commit                              │
└─────────────────────────────────────────┘
```

## Test Structure

```typescript
describe('[Unit being tested]', () => {
  it('should [expected behavior] when [condition]', () => {
    // Arrange
    const input = ...;
    
    // Act
    const result = ...;
    
    // Assert
    expect(result).toBe(...);
  });
});
```

## What to Test

| Test Type | What | Tool |
|-----------|------|------|
| Unit | Pure functions, utils | Jest/Vitest |
| Integration | API endpoints | Supertest |
| Component | UI behavior | Testing Library |
| E2E | User flows | Playwright |

## Test Isolation

Each test:
- Sets up its own data
- Doesn't depend on other tests
- Cleans up after itself
- Can run in any order

## During Implementation

Once tests are written:
1. Lock tests: `echo "implementing" > .claude/state/phase`
2. Tests cannot be modified
3. Only production code changes
4. If tests are wrong, enter /fix mode

## Exit Criteria

- [ ] Test written BEFORE production code
- [ ] Test failed initially
- [ ] Test passes now
- [ ] Test covers the acceptance criteria
