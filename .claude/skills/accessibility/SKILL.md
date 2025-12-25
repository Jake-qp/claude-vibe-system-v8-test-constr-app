---
name: accessibility
description: WCAG accessibility compliance
triggers:
  - UI development
  - Before launch
  - "make accessible"
generates: null
---

# Accessibility Skill

Make applications usable by everyone.

## When This Skill Activates

- Building UI components
- Before launch review
- Accessibility audit

## WCAG Checklist

### Perceivable
- [ ] Alt text on images
- [ ] Sufficient color contrast (4.5:1 text, 3:1 large text)
- [ ] Don't rely on color alone
- [ ] Captions for video

### Operable
- [ ] Keyboard navigation works
- [ ] Focus visible
- [ ] Skip links for navigation
- [ ] No keyboard traps

### Understandable
- [ ] Form labels present
- [ ] Error messages clear
- [ ] Consistent navigation
- [ ] Language declared

### Robust
- [ ] Valid HTML
- [ ] ARIA used correctly
- [ ] Works with screen readers

## Common Patterns

### Buttons vs Links
```jsx
// Link: Navigation
<Link href="/about">About</Link>

// Button: Actions
<button onClick={handleSubmit}>Submit</button>
```

### Form Accessibility
```jsx
<label htmlFor="email">Email</label>
<input 
  id="email" 
  type="email"
  aria-describedby="email-hint"
  aria-invalid={hasError}
/>
<p id="email-hint">We'll never share your email</p>
```

## Testing

1. Keyboard navigation (Tab through everything)
2. Screen reader (VoiceOver, NVDA)
3. Automated (axe, Lighthouse)

## Exit Criteria

- [ ] Keyboard navigation complete
- [ ] Screen reader tested
- [ ] Lighthouse accessibility > 90
