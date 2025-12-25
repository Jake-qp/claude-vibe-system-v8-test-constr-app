---
description: Safely improve code without changing behavior. Usage: /refactor "goal"
---

# /refactor - Safe Code Improvement

**Goal:** $ARGUMENTS

---

## Refactoring Rules

1. **No behavior changes** - tests must pass without modification
2. **Small steps** - one refactoring pattern at a time
3. **Commit often** - each step is independently revertable
4. **Tests first** - ensure coverage before refactoring

---

## Phase 1: Safety Check

### Test Coverage
- Do tests exist for code being refactored?
- If not, write tests FIRST

### Create Checkpoint
```bash
git add -A
git stash  # or commit
```

---

## Phase 2: Plan

### Common Refactoring Patterns
| Pattern | When | Example |
|---------|------|---------|
| Extract function | Code duplication | Pull repeated code into function |
| Rename | Unclear names | Better variable/function names |
| Move | Wrong location | File in wrong directory |
| Inline | Over-abstraction | Remove unnecessary indirection |
| Simplify | Complex conditionals | Reduce nesting, early returns |

### My Refactoring Plan
```
1. [Small step 1]
2. [Small step 2]
...
```

---

## Phase 3: Execute Loop

For each step:

1. **Make ONE change**
2. **Run tests immediately**
   - If pass: commit
   - If fail: revert, rethink

```bash
# After each step
npm test  # or equivalent
git add -A
git commit -m "refactor: [what changed]"
```

---

## Phase 4: Verify

Load skill: `.claude/skills/verification/SKILL.md`

- All tests pass
- Behavior unchanged
- Code is measurably better (less duplication, clearer names, etc.)

---

## If Something Breaks

```bash
git stash pop  # or reset to checkpoint
```

Refactoring should NEVER break things. If it does, step was too big.
