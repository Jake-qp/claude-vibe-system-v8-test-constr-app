---
description: Explore a vague idea. Usage: /brainstorm "idea"
---

# /brainstorm - Explore Ideas

**Idea:** $ARGUMENTS

---

## Purpose

Turn vague ideas into actionable specifications.
No code. No implementation. Just exploration.

---

## Exploration Questions

### What problem does this solve?
```
[Answer]
```

### Who is this for?
```
[Answer]
```

### What's the simplest version?
```
[Answer]
```

### What already exists?
```
[Similar solutions, prior art]
```

### What's the risky part?
```
[Technical risks, unknowns]
```

---

## Output Options

After exploration, suggest:

1. **Ready to build?**
   → `/build "refined description"`

2. **Need research?**
   → Spawn `.claude/agents/researcher.md`

3. **Too big?**
   → Break into smaller pieces, add to .tasks

4. **Not worth it?**
   → Document decision, move on

---

## Save to SCRATCHPAD

```markdown
## Brainstorm: [Idea]
Date: [today]

### Summary
[Key insights from exploration]

### Decision
[Build / Research more / Break down / Pass]

### Next Steps
[If applicable]
```
