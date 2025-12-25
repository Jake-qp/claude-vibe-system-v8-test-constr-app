---
name: documentation
description: Documentation generation and maintenance
triggers:
  - README updates
  - API documentation
  - Setup guides
generates: README.md
---

# Documentation Skill

Create useful, maintainable documentation.

## When This Skill Activates

- Project setup complete
- API changes
- New features added

## README Structure

```markdown
# Project Name

Brief description of what this does.

## Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## Features

- Feature 1
- Feature 2

## Architecture

[High-level overview]

## Development

### Prerequisites
- Node.js 18+
- PostgreSQL

### Setup
[Step-by-step setup]

### Testing
[How to run tests]

## Deployment

[How to deploy]

## Contributing

[Contribution guidelines]
```

## Documentation Types

| Type | Where | Updates |
|------|-------|---------|
| Quick start | README | When setup changes |
| API reference | docs/API.md | When endpoints change |
| Architecture | ARCHITECTURE.md | When structure changes |
| Runbook | docs/RUNBOOK.md | When ops procedures change |

## Exit Criteria

- [ ] README accurate and complete
- [ ] Setup instructions work on fresh machine
- [ ] API docs current
- [ ] Architecture documented
