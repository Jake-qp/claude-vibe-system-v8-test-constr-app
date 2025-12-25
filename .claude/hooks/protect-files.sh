#!/bin/bash
# Claude Code V8 - File Protection Hook
# Runs after Write/Edit operations

FILE="$1"
PHASE_FILE=".claude/state/phase"

# Always protect these files from modification
PROTECTED_FILES=(
    ".env"
    ".env.local"
    ".env.production"
    "package-lock.json"
    "yarn.lock"
    "pnpm-lock.yaml"
    "Gemfile.lock"
    "poetry.lock"
    "Cargo.lock"
    "go.sum"
)

for protected in "${PROTECTED_FILES[@]}"; do
    if [[ "$FILE" == *"$protected"* ]]; then
        echo "WARNING: Modified protected file: $protected"
        echo "This file should typically not be manually edited."
    fi
done

# Phase-based test protection
if [ -f "$PHASE_FILE" ]; then
    PHASE=$(cat "$PHASE_FILE")
    
    # During implementation phase, tests should not be modified
    if [ "$PHASE" = "implementing" ]; then
        if [[ "$FILE" == *".test."* ]] || [[ "$FILE" == *".spec."* ]] || [[ "$FILE" == *"__tests__"* ]]; then
            echo "BLOCKED: Cannot modify tests during implementation phase."
            echo "Tests are locked. Write code to make them pass."
            echo "If tests are wrong, use /fix to enter debugging mode first."
            exit 1
        fi
    fi
fi

exit 0
