---
description: Make a small change quickly. Usage: /quick "what to change"
---

# /quick - Quick Change Mode

**Change:** $ARGUMENTS

## Is This Quick?

### Micro (zero ceremony)
- [ ] < 20 lines changed
- [ ] Single file
- [ ] No new dependencies
- [ ] Not security-sensitive

**If all checked:** Make the change → Test → Commit. Done.

### Quick (minimal ceremony)
- [ ] < 50 lines changed
- [ ] 1-2 files maximum
- [ ] Dependencies already in project
- [ ] Not security-sensitive

**If all checked:** Continue below.

### Not Quick?

If any fail, suggest: `/build "$ARGUMENTS"` instead.

---

## Quick Workflow

1. **Locate**
   - Find the exact files to change
   - Read current implementation

2. **Change**
   - Make the minimal change
   - Follow existing patterns

3. **Test**
   - Run existing tests: `npm test` (or equivalent)
   - Manual smoke test if UI change

4. **Commit**
   ```bash
   git add -A
   git commit -m "feat: $ARGUMENTS"
   ```

5. **Done**
   - Report what changed
   - No extensive documentation needed for quick changes
