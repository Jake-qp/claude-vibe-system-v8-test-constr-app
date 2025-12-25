---
name: devops
description: CI/CD and deployment patterns
triggers:
  - Setting up deployment
  - CI/CD pipeline
  - Infrastructure
generates: docs/DEPLOYMENT.md, docs/RUNBOOK.md, docs/MONITORING.md
---

# DevOps Skill

Set up reliable deployment and operations.

## When This Skill Activates

- Configuring CI/CD
- Setting up environments
- Production deployment
- Monitoring setup

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: CI/CD
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm test
      - run: npm run build
  
  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run deploy
```

## Documentation

### docs/DEPLOYMENT.md
```markdown
# Deployment

## Environments
| Env | URL | Branch |
|-----|-----|--------|
| Production | app.example.com | main |
| Staging | staging.example.com | develop |

## Deploy Process
1. PR merged to main
2. CI runs tests
3. Build created
4. Deployed to production
5. Health check verified

## Rollback
[Rollback instructions]
```

### docs/RUNBOOK.md
```markdown
# Runbook

## Common Issues

### High Error Rate
1. Check logs: [command]
2. Check database: [command]
3. Escalation: [contact]

### Database Issues
1. Check connections: [command]
2. Check slow queries: [command]
```

## Exit Criteria

- [ ] CI runs on all PRs
- [ ] CD deploys from main
- [ ] Rollback documented
- [ ] Monitoring configured
