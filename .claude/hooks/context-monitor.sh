#!/bin/bash
# Claude Code V8 - Context Monitor Hook
# Tracks context usage and warns before exhaustion

STATE_FILE=".claude/state/context-usage"
mkdir -p .claude/state

# Estimate current context usage (rough approximation)
# In practice, Claude tracks this internally
estimate_context() {
    local total=0
    
    # Count tokens in key files (rough estimate: 4 chars = 1 token)
    for file in SCRATCHPAD.md .spec .tasks; do
        if [ -f "$file" ]; then
            chars=$(wc -c < "$file")
            tokens=$((chars / 4))
            total=$((total + tokens))
        fi
    done
    
    # Count recently accessed source files
    if [ -d "src" ]; then
        recent_chars=$(find src -type f -mmin -30 -exec wc -c {} + 2>/dev/null | tail -1 | awk '{print $1}')
        recent_tokens=$((recent_chars / 4))
        total=$((total + recent_tokens))
    fi
    
    echo $total
}

# Get estimated usage
USAGE=$(estimate_context)
MAX_CONTEXT=150000  # Conservative estimate for 200K context

# Calculate percentage
PERCENT=$((USAGE * 100 / MAX_CONTEXT))

# Save state
echo "$PERCENT" > "$STATE_FILE"

# Warnings based on threshold
if [ "$PERCENT" -ge 90 ]; then
    echo "🚨 CRITICAL: Context usage at ~${PERCENT}%"
    echo "Actions to take:"
    echo "  1. Complete current task and commit"
    echo "  2. Summarize progress in SCRATCHPAD.md"
    echo "  3. Start new session"
    
    # Auto-save state
    if [ -f "SCRATCHPAD.md" ]; then
        echo "" >> SCRATCHPAD.md
        echo "## Context Warning - $(date)" >> SCRATCHPAD.md
        echo "Session approaching context limit. Saving state for continuity." >> SCRATCHPAD.md
    fi
    
elif [ "$PERCENT" -ge 75 ]; then
    echo "⚠️  WARNING: Context usage at ~${PERCENT}%"
    echo "Consider completing current feature soon and starting fresh session."
fi

exit 0
