---
name: ui-design
description: Visual design and design system patterns
triggers:
  - First UI component
  - "make it look good"
  - Design system creation
generates: DESIGN-SYSTEM.md
---

# UI Design Skill

Create consistent, polished interfaces.

## When This Skill Activates

- Starting UI work
- Creating component library
- Improving visual design

## Design System Foundation

Create or update DESIGN-SYSTEM.md:

```markdown
# Design System

## Colors
| Token | Value | Usage |
|-------|-------|-------|
| --primary | #3b82f6 | Buttons, links |
| --primary-hover | #2563eb | Hover states |
| --background | #ffffff | Page background |
| --foreground | #0f172a | Text |
| --muted | #64748b | Secondary text |
| --border | #e2e8f0 | Borders |
| --error | #ef4444 | Error states |
| --success | #22c55e | Success states |

## Typography
| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| h1 | 2.25rem | 700 | Page titles |
| h2 | 1.5rem | 600 | Section headers |
| body | 1rem | 400 | Body text |
| small | 0.875rem | 400 | Captions |

## Spacing
Use 4px base: 4, 8, 12, 16, 24, 32, 48, 64

## Components
[Component patterns documented here]
```

## Design Principles

1. **Consistency** - Same patterns everywhere
2. **Hierarchy** - Clear visual priority
3. **Feedback** - Show loading, success, errors
4. **Accessibility** - Contrast, focus, labels

## Component Checklist

For each component:
- [ ] Follows design system tokens
- [ ] Has loading state
- [ ] Has error state
- [ ] Has empty state
- [ ] Keyboard accessible
- [ ] Mobile responsive

## Exit Criteria

- [ ] DESIGN-SYSTEM.md exists
- [ ] Color tokens defined
- [ ] Typography scale defined
- [ ] Components follow system
