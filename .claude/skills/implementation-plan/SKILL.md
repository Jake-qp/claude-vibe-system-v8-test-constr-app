---
name: implementation-plan
description: Break features into ordered implementation tasks
triggers:
  - After spec, before coding
  - Complex features
generates: SCRATCHPAD entries
---

# Implementation Plan Skill

Break work into manageable, ordered tasks.

## When This Skill Activates

- After specification is approved
- Before writing code
- When feature seems overwhelming

## Planning Principles

1. **Frontend First** - UI before API (when applicable)
   - Designers and users can give feedback
   - Mocks clarify requirements
   - Backend scope becomes clearer

2. **One Commit Per Task** - Atomic units
   - Each task independently revertable
   - Clear progress tracking
   - Easy code review

3. **Tests Accompany** - Not after
   - Test written with implementation
   - TDD applied per task

## Plan Format

Add to SCRATCHPAD.md:

```markdown
## Implementation Plan: [Feature]

### Tasks (in order)
1. [ ] [Component/UI task] - [what and why]
2. [ ] [Test for above]
3. [ ] [Next component task]
4. [ ] [API endpoint task]
5. [ ] [Integration task]
6. [ ] [Final verification]

### Dependencies
- [External: any APIs to verify first]
- [Internal: any blocking work]

### Risks
- [Known unknowns]
```

## Task Sizing

**Good task:** 15-60 minutes, 1 commit
**Too big:** 2+ hours, multiple concerns
**Too small:** Trivial, merge with related work

## Exit Criteria

- [ ] All tasks listed
- [ ] Order makes sense
- [ ] Each task is 1 commit
- [ ] Dependencies identified
- [ ] Risks acknowledged
