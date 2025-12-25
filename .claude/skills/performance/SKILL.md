---
name: performance
description: Performance optimization patterns
triggers:
  - Slow page loads
  - Database bottlenecks
  - Before launch scaling
generates: null
---

# Performance Skill

Optimize application performance.

## When This Skill Activates

- Performance issues reported
- Before launch scaling review
- Large dataset handling

## Frontend Performance

### Core Web Vitals
- **LCP** < 2.5s (Largest Contentful Paint)
- **FID** < 100ms (First Input Delay)
- **CLS** < 0.1 (Cumulative Layout Shift)

### Optimization Techniques
- [ ] Images optimized (WebP, lazy loading)
- [ ] Bundle splitting (dynamic imports)
- [ ] Caching headers set
- [ ] Critical CSS inlined

## Backend Performance

### Database
- [ ] Indexes on query columns
- [ ] No N+1 queries
- [ ] Connection pooling
- [ ] Query result caching

### API
- [ ] Pagination on lists
- [ ] Response compression
- [ ] Rate limiting
- [ ] CDN for static assets

## Measurement

```javascript
// Performance timing
console.time('operation');
await expensiveOperation();
console.timeEnd('operation');

// Database query explain
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';
```

## Exit Criteria

- [ ] Core Web Vitals in green
- [ ] Database queries < 100ms
- [ ] API responses < 200ms
- [ ] No obvious bottlenecks
