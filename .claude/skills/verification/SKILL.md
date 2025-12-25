---
name: verification
description: Verify work before completion
triggers:
  - Before marking task complete
  - Before /launch
  - Iron Law 3 enforcement
generates: null
---

# Verification Skill

**Iron Law 3: No Completion Claims Without Fresh Verification Evidence**

## When This Skill Activates

- Finishing any task
- Before saying "done"
- Before /launch

## Verification Requirements

### Code Verification
1. **Run tests** (don't assume they pass)
   ```bash
   npm test
   ```
2. **Run linter**
   ```bash
   npm run lint
   ```
3. **Build successfully**
   ```bash
   npm run build
   ```

### Manual Verification
For UI changes:
1. Actually click through the flow
2. Check on different screen sizes
3. Test error states

For API changes:
1. Call endpoints with curl/Postman
2. Verify response shapes
3. Test error handling

### Against Specification
Review .spec file:
- [ ] Each acceptance criterion manually verified
- [ ] Edge cases tested
- [ ] Out-of-scope items not implemented

## Evidence Format

```markdown
## Verification Evidence

### Automated
- Tests: ✅ 47 passing, 0 failing
- Lint: ✅ No errors
- Build: ✅ Success

### Manual
- [x] Created new user successfully
- [x] Error shown for duplicate email
- [x] Mobile responsive verified

### Spec Criteria
- [x] "User can sign up" - verified
- [x] "Email validation" - verified
```

## Exit Criteria

- [ ] All tests pass (fresh run)
- [ ] Build succeeds
- [ ] Manual testing done
- [ ] All .spec criteria verified
- [ ] Evidence documented
