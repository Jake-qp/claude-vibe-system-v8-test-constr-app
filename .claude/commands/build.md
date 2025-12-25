---
description: Build a complete feature. Usage: /build "feature description"
---

# /build - Build a Feature

**Feature:** $ARGUMENTS

---

## Phase 0: Size Check

### How Big Is This?

**Quick** (use /quick instead):
- < 50 lines
- 1-2 files
- Known patterns

**Medium** (continue here):
- 50-500 lines
- 3-10 files
- Some new patterns

**Large** (extra planning):
- 500+ lines
- 10+ files
- New architecture

---

## Phase 1: Initialization

### First /build in this project?

If no ARCHITECTURE.md exists:
1. Load skill: `.claude/skills/brainstorm/SKILL.md`
2. Spawn agent: `.claude/agents/initializer.md`
3. Create ARCHITECTURE.md, SCRATCHPAD.md

### Existing project?

1. Read ARCHITECTURE.md for patterns
2. Read SCRATCHPAD.md for context
3. Check .tasks for related work

---

## Phase 2: Specification

Load skill: `.claude/skills/spec/SKILL.md`

Create .spec file with:
- User story
- Acceptance criteria (testable)
- Edge cases
- Out of scope

---

## Phase 3: Design

### UI Involved?
Load: `.claude/skills/ui-design/SKILL.md`
- Component breakdown
- Design tokens
- User flows

### API Involved?
Load: `.claude/skills/design/SKILL.md`
- API contracts
- Request/response shapes
- Error codes

### External APIs?
Load: `.claude/skills/verify-api/SKILL.md`
**Iron Law 4: Verify before use**

---

## Phase 4: Implementation Plan

Load skill: `.claude/skills/implementation-plan/SKILL.md`

Break into tasks:
1. Each task = 1 commit
2. Frontend first (when applicable)
3. Tests accompany each task

Add to SCRATCHPAD.md:
```
## Implementation Plan
- [ ] Task 1: [description]
- [ ] Task 2: [description]
...
```

---

## Phase 5: Build Loop

For each task:

### 5a. Write Tests First (Iron Law 1)
Load skill: `.claude/skills/tdd/SKILL.md`
- Write failing test
- Verify it fails for right reason
- Lock tests: `echo "implementing" > .claude/state/phase`

### 5b. Implement
- Write code to pass test
- Follow patterns from ARCHITECTURE.md
- Tests are LOCKED - cannot modify

### 5c. Verify
- Run tests: all must pass
- Unlock tests: `echo "planning" > .claude/state/phase`

### 5d. Commit
```bash
git add -A
git commit -m "feat($scope): $description"
```

---

## Phase 6: Quality Check

### Security Check (if applicable)
Load skill: `.claude/skills/security/SKILL.md`
**This skill BLOCKS if checks fail**

### Error Handling
Load skill: `.claude/skills/error-handling/SKILL.md`
- All error paths handled?
- User-friendly messages?

### Accessibility (if UI)
Load skill: `.claude/skills/accessibility/SKILL.md`

---

## Phase 7: Verification (Iron Law 3)

Load skill: `.claude/skills/verification/SKILL.md`

Fresh verification:
1. Run full test suite
2. Manual smoke test
3. Check against .spec acceptance criteria

---

## Phase 8: Documentation

Update as needed:
- ARCHITECTURE.md if patterns changed
- README.md if setup changed
- API docs if endpoints added

Clear SCRATCHPAD.md current task section.

---

## Done

Report:
- What was built
- Files changed
- Tests added
- Any follow-up items for .tasks
