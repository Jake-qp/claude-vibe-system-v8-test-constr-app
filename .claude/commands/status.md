---
description: Show current project state. Usage: /status
---

# /status - Current State

---

## Project Status

### Quick Info
```
📁 Project: [from CLAUDE.md]
🌿 Branch: [current git branch]
📊 State: [from .claude/state/phase]
```

### Context Health
```
Context usage: [from .claude/state/context-usage]%
[████████░░] 80% - Consider finishing current task
```

### Active Work

**Current Task:**
[From SCRATCHPAD.md current section]

**Tasks Queue:**
```
[~] In progress task
[ ] Next task
[ ] Another task
```

### Recent Activity
```
Last 3 commits:
- [commit message]
- [commit message]  
- [commit message]
```

### Warnings

⚠️ [Any issues from .issues]
⚠️ [Uncommitted changes if any]
⚠️ [Context warnings if applicable]

---

## Health Checks

- Tests: [passing/failing/none]
- Lint: [clean/issues/not configured]
- Build: [success/fail/not tested]
