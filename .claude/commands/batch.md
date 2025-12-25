---
description: Process multiple tasks autonomously. Usage: /batch
---

# /batch - Batch Processing Mode

Process tasks from .tasks file autonomously.

---

## Prerequisites

1. .tasks file exists with pending tasks
2. Each task is well-defined
3. Maximum 5-7 tasks per batch

---

## Batch Format

.tasks file format:
```
# Task Queue
# [ ] Not started
# [~] In progress  
# [x] Done (YYYY-MM-DD)
# [!] Stuck
# [REVIEW] tag = stop for approval

[ ] Task 1 description
[ ] Task 2 description
[REVIEW] Task 3 - needs human approval
```

---

## Batch Execution

For each task:

1. **Mark in progress**
   ```
   [~] Task description
   ```

2. **Execute**
   - Use appropriate command internally (/build, /fix, /refactor)
   - Follow all Iron Laws
   - Commit after each task

3. **Mark complete**
   ```
   [x] Task description (2024-01-15)
   ```

4. **Handle stuck tasks**
   - After 3 failures: mark [!]
   - Document blocker in SCRATCHPAD.md
   - Move to next task

---

## Task Isolation

Each task:
- Gets clean git state
- Independent of other task failures
- Has its own commit

---

## Completion

After all tasks:

1. Run `.claude/hooks/notify.sh "Batch Complete" "Processed X tasks"`
2. Summary in SCRATCHPAD.md:
   ```
   ## Batch Run - [Date]
   - Completed: X tasks
   - Stuck: Y tasks
   - Time: ~Z minutes
   ```

---

## REVIEW Tasks

When encountering [REVIEW] tag:
1. Stop batch processing
2. Notify user
3. Wait for approval before continuing
