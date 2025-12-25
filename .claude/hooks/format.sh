#!/bin/bash
# Claude Code V8 - Auto-Format Hook
# Runs after Write/Edit operations

FILE="$1"
EXTENSION="${FILE##*.}"

# Skip if file doesn't exist
[ ! -f "$FILE" ] && exit 0

case "$EXTENSION" in
    js|jsx|ts|tsx|json|css|scss|md|html|yaml|yml)
        if command -v prettier &> /dev/null; then
            prettier --write "$FILE" 2>/dev/null
        elif command -v npx &> /dev/null; then
            npx prettier --write "$FILE" 2>/dev/null
        fi
        ;;
    py)
        if command -v black &> /dev/null; then
            black "$FILE" 2>/dev/null
        elif command -v ruff &> /dev/null; then
            ruff format "$FILE" 2>/dev/null
        fi
        ;;
    go)
        if command -v gofmt &> /dev/null; then
            gofmt -w "$FILE" 2>/dev/null
        fi
        ;;
    rs)
        if command -v rustfmt &> /dev/null; then
            rustfmt "$FILE" 2>/dev/null
        fi
        ;;
    rb)
        if command -v rubocop &> /dev/null; then
            rubocop -a "$FILE" 2>/dev/null
        fi
        ;;
esac

exit 0
