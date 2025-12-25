---
name: database
description: Database design and query patterns
triggers:
  - Schema design
  - Complex queries
  - Migrations
generates: docs/DATA-MODELS.md
---

# Database Skill

Design efficient, maintainable database schemas.

## When This Skill Activates

- Creating new tables
- Writing complex queries
- Performance optimization
- Running migrations

## Schema Design

### Document in docs/DATA-MODELS.md
```markdown
## Users Table

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| id | uuid | PK, default gen | |
| email | varchar(255) | unique, not null | Indexed |
| password_hash | varchar(255) | not null | bcrypt |
| created_at | timestamp | default now() | |

### Indexes
- `idx_users_email` on email

### Relationships
- has_many: posts
```

## Query Patterns

### Avoid N+1
```typescript
// ❌ Bad: N+1 queries
const posts = await getPosts();
for (const post of posts) {
  post.author = await getUser(post.userId); // N queries!
}

// ✅ Good: Single query with join
const posts = await db.query(`
  SELECT posts.*, users.name as author_name
  FROM posts
  JOIN users ON posts.user_id = users.id
`);
```

### Use Transactions
```typescript
await db.transaction(async (tx) => {
  await tx.insert(orders).values(order);
  await tx.update(inventory).decrement('stock', quantity);
});
```

## Migration Pattern

```bash
# Create migration
npm run db:migrate:create add_users_table

# Test locally
npm run db:migrate:up

# Apply to staging first
npm run db:migrate:up --env staging

# Then production
npm run db:migrate:up --env production
```

## Exit Criteria

- [ ] Schema documented in DATA-MODELS.md
- [ ] Indexes on frequently queried columns
- [ ] No N+1 queries
- [ ] Migrations tested locally first
