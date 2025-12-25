#!/bin/bash
# Claude Code V8 - Session Start Hook

clear

echo "┌─────────────────────────────────────────┐"
echo "│         Claude Code V8 Ready            │"
echo "└─────────────────────────────────────────┘"
echo ""

# Show project name if CLAUDE.md exists
if [ -f "CLAUDE.md" ]; then
    PROJECT=$(head -1 CLAUDE.md | sed 's/# Project: //')
    echo "📁 Project: $PROJECT"
fi

# Show current git branch
if git rev-parse --git-dir > /dev/null 2>&1; then
    BRANCH=$(git branch --show-current)
    echo "🌿 Branch: $BRANCH"
    
    # Check for uncommitted work
    if [ -n "$(git status --porcelain)" ]; then
        echo "⚠️  Uncommitted changes detected"
    fi
fi

# Show pending tasks
if [ -f ".tasks" ]; then
    PENDING=$(grep -c "^\[ \]" .tasks 2>/dev/null || echo "0")
    IN_PROGRESS=$(grep -c "^\[\~\]" .tasks 2>/dev/null || echo "0")
    if [ "$PENDING" != "0" ] || [ "$IN_PROGRESS" != "0" ]; then
        echo "📋 Tasks: $PENDING pending, $IN_PROGRESS in progress"
    fi
fi

# Show SCRATCHPAD resume point if exists
if [ -f "SCRATCHPAD.md" ]; then
    echo "📝 SCRATCHPAD.md exists - check for resume context"
fi

echo ""
echo "Commands: /quick | /build | /fix | /refactor | /status | /help"
echo ""
