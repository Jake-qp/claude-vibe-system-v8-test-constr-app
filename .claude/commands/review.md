---
description: Summarize recent work. Usage: /review
---

# /review - Work Summary

Summarize what's been accomplished.

---

## Sources

Read and summarize:

1. **.log** - Execution history
2. **.tasks** - Completed tasks
3. **.issues** - Logged issues
4. **SCRATCHPAD.md** - Session notes
5. **Git log** - Recent commits

---

## Summary Format

```markdown
## Work Summary - [Date Range]

### Completed
- [Feature/fix 1]
- [Feature/fix 2]

### In Progress
- [Current work]

### Blocked/Stuck
- [Issue and blocker]

### Statistics
- Commits: X
- Files changed: Y
- Tests added: Z

### Next Steps
- [ ] [Suggested next task]
```

---

## Git Summary

```bash
# Recent commits
git log --oneline -10

# Files changed today
git diff --stat HEAD~5

# Contributors
git shortlog -sn --since="1 week ago"
```
