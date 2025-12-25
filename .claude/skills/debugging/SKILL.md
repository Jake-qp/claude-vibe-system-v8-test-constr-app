---
name: debugging
description: Systematic debugging approach
triggers:
  - /fix command
  - Test failures
  - Runtime errors
generates: null
---

# Debugging Skill

**Iron Law 2: No Fixes Without Root Cause Investigation First**

## The 3-Failure Rule

After 3 failed attempts at same approach:
1. STOP
2. Step back and reassess
3. Try fundamentally different approach
4. Or spawn explorer/fixer agent

## Debugging Process

### 1. Reproduce
- Get exact steps
- Create failing test
- Confirm it fails consistently

### 2. Isolate
- Narrow down where failure occurs
- Binary search through code path
- Add logging at key points

### 3. Understand (Root Cause)
```
Symptom: [What's happening]
Hypothesis: [What might cause this]
Evidence: [How to verify hypothesis]
Root Cause: [Actual underlying issue]
```

### 4. Fix
- Fix root cause, not symptom
- Minimal change
- Don't refactor while debugging

### 5. Verify
- Original test passes
- No new failures
- Bug no longer reproducible

## Common Debugging Techniques

| Technique | When |
|-----------|------|
| Console logging | Following data flow |
| Debugger breakpoints | Inspecting state |
| Git bisect | Finding regression |
| Minimal reproduction | Complex bugs |
| Rubber duck | Stuck thinking |

## Exit Criteria

- [ ] Root cause identified and documented
- [ ] Fix addresses root cause
- [ ] Test proves fix works
- [ ] No new failures introduced
