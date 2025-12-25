#!/bin/bash
# Claude Code V8 - Checkpoint Hook
# Runs when Claude stops (session end, interruption)

# Create state directory if needed
mkdir -p .claude/state

# Update SCRATCHPAD with current state
if [ -f "SCRATCHPAD.md" ]; then
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    
    # Append checkpoint marker
    echo "" >> SCRATCHPAD.md
    echo "---" >> SCRATCHPAD.md
    echo "**Checkpoint:** $TIMESTAMP" >> SCRATCHPAD.md
    
    # Add git status if in a repo
    if git rev-parse --git-dir > /dev/null 2>&1; then
        BRANCH=$(git branch --show-current)
        COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "none")
        echo "- Branch: $BRANCH" >> SCRATCHPAD.md
        echo "- Last commit: $COMMIT" >> SCRATCHPAD.md
        
        # Note uncommitted changes
        if [ -n "$(git status --porcelain)" ]; then
            echo "- Uncommitted changes:" >> SCRATCHPAD.md
            git status --porcelain | while read line; do
                echo "  - $line" >> SCRATCHPAD.md
            done
        fi
    fi
fi

# Auto-commit if there are changes and we're in a git repo
if git rev-parse --git-dir > /dev/null 2>&1; then
    if [ -n "$(git status --porcelain)" ]; then
        # Stage all changes
        git add -A
        
        # Create checkpoint commit
        TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
        git commit -m "checkpoint: $TIMESTAMP" --no-verify 2>/dev/null
        
        echo "Created checkpoint commit"
    fi
fi

exit 0
