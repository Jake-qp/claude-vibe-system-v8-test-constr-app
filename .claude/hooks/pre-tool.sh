#!/bin/bash
# Claude Code V8 - Pre-Tool Hook
# Runs before Bash, Write, Edit operations

TOOL="$1"
ARGS="$2"

# Block dangerous commands
if [ "$TOOL" = "Bash" ]; then
    DANGEROUS_PATTERNS=(
        "rm -rf /"
        "rm -rf /*"
        "rm -rf ~"
        "> /dev/sda"
        "mkfs"
        "dd if="
        ":(){:|:&};:"
    )
    
    for pattern in "${DANGEROUS_PATTERNS[@]}"; do
        if [[ "$ARGS" == *"$pattern"* ]]; then
            echo "BLOCKED: Dangerous command detected: $pattern"
            exit 1
        fi
    done
fi

# Secret scanning for Write/Edit operations
if [ "$TOOL" = "Write" ] || [ "$TOOL" = "Edit" ]; then
    # Check for hardcoded secrets in the content
    SECRET_PATTERNS=(
        "sk-[a-zA-Z0-9]{20,}"          # Stripe/OpenAI keys
        "AKIA[0-9A-Z]{16}"              # AWS access keys
        "ghp_[a-zA-Z0-9]{36}"           # GitHub tokens
        "xox[baprs]-[a-zA-Z0-9-]+"      # Slack tokens
        "-----BEGIN.*PRIVATE KEY-----"  # Private keys
    )
    
    for pattern in "${SECRET_PATTERNS[@]}"; do
        if echo "$ARGS" | grep -qE "$pattern"; then
            echo "WARNING: Possible secret detected. Use environment variables instead."
            echo "Pattern matched: $pattern"
            # Don't block, just warn
        fi
    done
fi

# Ensure tests run before commits
if [ "$TOOL" = "Bash" ]; then
    if [[ "$ARGS" == *"git commit"* ]] || [[ "$ARGS" == *"git push"* ]]; then
        # Check if tests exist and should run
        if [ -f "package.json" ] && grep -q '"test"' package.json; then
            echo "Reminder: Ensure tests pass before committing"
        fi
    fi
fi

exit 0
