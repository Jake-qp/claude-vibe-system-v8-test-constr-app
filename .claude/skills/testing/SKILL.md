---
name: testing
description: Test setup and strategies
triggers:
  - Test framework setup
  - Testing patterns
  - E2E test creation
generates: null
---

# Testing Skill

Set up and maintain effective test suites.

## When This Skill Activates

- Setting up test framework
- Writing integration tests
- E2E test creation

## Test Pyramid

```
         /\
        /E2E\        Few, slow, high confidence
       /------\
      / Integ  \     Some, medium speed
     /----------\
    /   Unit     \   Many, fast, isolated
   /--------------\
```

## Framework Setup

### Jest/Vitest
```javascript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: { reporter: ['text', 'html'] }
  }
});
```

### Playwright (E2E)
```javascript
// playwright.config.ts
export default defineConfig({
  testDir: './e2e',
  use: { baseURL: 'http://localhost:3000' },
  webServer: {
    command: 'npm run dev',
    port: 3000,
  }
});
```

## Test Patterns

### Component Tests
```typescript
test('shows error for invalid input', async () => {
  render(<LoginForm />);
  await userEvent.type(screen.getByLabelText('Email'), 'invalid');
  await userEvent.click(screen.getByRole('button'));
  expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
});
```

### API Tests
```typescript
test('returns 401 for unauthenticated request', async () => {
  const response = await fetch('/api/protected');
  expect(response.status).toBe(401);
});
```

## Exit Criteria

- [ ] Test framework configured
- [ ] CI runs tests
- [ ] Coverage thresholds set
- [ ] Flaky tests addressed
