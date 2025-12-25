---
description: Fix a bug with proper debugging. Usage: /fix "bug description"
---

# /fix - Fix a Bug

**Bug:** $ARGUMENTS

---

## Iron Law 2: Root Cause First

Before fixing anything, understand WHY.

---

## Phase 1: Reproduce

1. Get exact reproduction steps
2. Create failing test that demonstrates bug
3. Verify test fails for right reason

```
Reproduction:
1. [step]
2. [step]
Expected: [what should happen]
Actual: [what happens]
```

---

## Phase 2: Investigate (Iron Law 2)

Load skill: `.claude/skills/debugging/SKILL.md`

### Find Root Cause
- Don't guess - trace the actual code path
- Use logging/debugger to follow data
- Check recent commits for regressions

### Document Understanding
```
Root Cause:
[What is actually broken and why]

NOT just symptoms. The actual cause.
```

---

## Phase 3: Three-Failure Rule

If stuck after 3 attempts:

1. STOP trying same approach
2. Spawn explorer agent: `.claude/agents/explorer.md`
3. Or spawn fixer agent: `.claude/agents/fixer.md`
4. Consider: Is root cause analysis correct?

---

## Phase 4: Fix

### Tests Unlocked in Fix Mode
Unlike /build, you CAN modify tests when:
- Test itself was wrong
- Test didn't cover the actual bug

### Minimal Fix
- Fix root cause, not symptoms
- Don't refactor while fixing
- Keep change small

---

## Phase 5: Verify (Iron Law 3)

1. Failing test now passes
2. All other tests still pass
3. Reproduce steps no longer show bug

---

## Phase 6: Commit

```bash
git add -A
git commit -m "fix($scope): $description

Root cause: [what was wrong]
Fix: [what we changed]"
```

---

## Phase 7: Prevent Recurrence

Add to .issues if systemic:
```
## [Date] - [Bug Title]
Root cause: [explanation]
Prevention: [how to avoid in future]
```
