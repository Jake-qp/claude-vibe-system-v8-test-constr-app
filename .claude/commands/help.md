---
description: Get guidance on using Claude Code. Usage: /help [topic]
---

# /help - Guidance

**Topic:** $ARGUMENTS

---

## Quick Help

### Commands
| Command | Purpose |
|---------|---------|
| /quick | Small changes (<50 lines) |
| /build | Full features |
| /fix | Bug fixes |
| /refactor | Code improvement |
| /batch | Process task queue |
| /brainstorm | Explore ideas |
| /launch | Production check |
| /review | Work summary |
| /status | Current state |

### Iron Laws
1. **Tests First** - Write failing test before code
2. **Root Cause** - Understand before fixing
3. **Verification** - Prove it works, don't assume
4. **API Verification** - Verify external APIs exist

---

## Topic-Specific Help

### "first time" / "getting started"
1. Start with `/quick "something simple"` to see workflow
2. Graduate to `/build "small feature"` 
3. Review Iron Laws in CLAUDE.md

### "stuck" / "not working"
1. Check `/status` for context
2. Have you tried 3 different approaches? (3-failure rule)
3. Consider `/fix` if it's a bug
4. Spawn fixer agent: `.claude/agents/fixer.md`

### "overwhelmed" / "too much"
1. You only need `/quick` and `/build` to start
2. Skills load automatically as needed
3. Documentation generates as you work

### "tests failing"
1. Read actual error message carefully
2. Is test correct? Use `/fix` to debug
3. Is implementation wrong? Keep iterating
4. Stuck 3 times? Time to step back

### "context/memory issues"
1. Check context usage with `/status`
2. Summarize progress in SCRATCHPAD.md
3. Commit current work
4. Start fresh session

---

## Getting More Help

- Read skill files in `.claude/skills/` for expertise
- Read agent files in `.claude/agents/` for delegation
- Check ARCHITECTURE.md for project patterns
