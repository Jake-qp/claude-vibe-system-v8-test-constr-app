# Project: [Name]

> [One sentence: what this does and for whom]

## Stack

- **Framework:** [Next.js / React / etc.]
- **Language:** [TypeScript / JavaScript]
- **Database:** [PostgreSQL / MongoDB / etc.]
- **Styling:** [Tailwind / CSS Modules / etc.]

## Commands

```bash
npm run dev      # Start dev server
npm test         # Run tests
npm run build    # Production build
npm run lint     # Linting
```

## Structure

```
src/
  app/           # App directory
  components/    # UI components
  lib/           # Utilities
```

## Conventions

- [Your code style rules]
- [Your naming conventions]
- [Any gotchas]

---

## Claude Code V8

### Quick Reference

| Need | Command | Description |
|------|---------|-------------|
| Tiny change | `/quick "change"` | < 50 lines, 1-2 files |
| New feature | `/build "feature"` | Full workflow |
| Fix bug | `/fix "bug"` | Debugging flow |
| Improve code | `/refactor "goal"` | Safe improvements |
| Batch tasks | `/batch` | Process queue |
| Explore idea | `/brainstorm "idea"` | Clarify vague ideas |
| Launch check | `/launch` | Production readiness |
| See status | `/status` | Current state |
| Get help | `/help` | Guidance |

### Iron Laws

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST              │
│ 2. NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST              │
│ 3. NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE     │
│ 4. NO EXTERNAL API USE WITHOUT VERIFICATION                     │
└─────────────────────────────────────────────────────────────────┘
```

### Skills (22)

Load skills on-demand. They provide expertise and generate docs.

#### Process Skills (10)
| Skill | When | Generates |
|-------|------|-----------|
| brainstorm | Vague ideas | - |
| spec | Defining features | .spec |
| design | UI/API contracts | - |
| verify-api | External dependencies | SCRATCHPAD |
| implementation-plan | Breaking into tasks | SCRATCHPAD |
| tdd | Tests + implementation | - |
| debugging | Bug fixes | - |
| security | Auth, payments, PII | docs/SECURITY.md |
| verification | Before completion | - |
| error-handling | Error patterns | - |

#### Domain Skills (12)
| Skill | When | Generates |
|-------|------|-----------|
| ui-design | Visual design | DESIGN-SYSTEM.md |
| frontend | React, state | - |
| backend | APIs, logic | docs/API-CONTRACTS.md |
| database | Schema, queries | docs/DATA-MODELS.md |
| testing | Test setup | - |
| performance | Optimization | - |
| accessibility | WCAG | - |
| devops | CI/CD, deploy | docs/DEPLOYMENT.md |
| integration | Third-party | - |
| mobile | React Native | - |
| documentation | README, guides | README.md |
| compliance | GDPR, PCI | docs/COMPLIANCE.md |

### Agents (5)

| Agent | Purpose | When |
|-------|---------|------|
| initializer | Project setup | First /build |
| explorer | Read-only investigation | Large codebase |
| reviewer | Quality review | Before completion |
| researcher | API verification | External dependencies |
| fixer | Error recovery | 3+ failures |
