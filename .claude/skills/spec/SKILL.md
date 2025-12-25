---
name: spec
description: Create clear feature specifications
triggers:
  - /build command
  - "define requirements"
generates: .spec file
---

# Spec Skill

Create clear, testable specifications.

## When This Skill Activates

- Before any /build
- When requirements are unclear
- When scope is creeping

## Specification Template

Create .spec file:

```
# Feature: [Name]

## User Story
As a [user type]
I want to [action]
So that [benefit]

## Acceptance Criteria
- [ ] [Testable criterion 1]
- [ ] [Testable criterion 2]
- [ ] [Testable criterion 3]

## Edge Cases
- [Edge case 1]
- [Edge case 2]

## Out of Scope
- [Explicitly excluded item]

## Technical Notes
- [Any technical constraints or decisions]
```

## Good Acceptance Criteria

✅ "User can log in with email and password"
❌ "Login should work well"

✅ "Form shows inline error for invalid email format"
❌ "Good validation"

## Exit Criteria

- [ ] User story complete
- [ ] All acceptance criteria are testable
- [ ] Edge cases identified
- [ ] Scope is bounded (out of scope defined)
