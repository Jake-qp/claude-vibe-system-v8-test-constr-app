---
name: verify-api
description: Verify external APIs before using them
triggers:
  - External API integration
  - Third-party services
  - Iron Law 4 enforcement
generates: SCRATCHPAD entries
---

# Verify API Skill

**Iron Law 4: No External API Use Without Verification**

## When This Skill Activates

- Before using any external API
- Before installing API SDK
- When "API changed" errors occur

## Verification Process

### Step 1: Find Official Documentation
- Go to official docs (not Stack Overflow)
- Find current API version
- Check deprecation notices

### Step 2: Verify Endpoint Exists
```
Endpoint: [URL]
Method: [HTTP method]
Auth: [Auth method]
Source: [Link to documentation]
Verified: [date]
```

### Step 3: Test Minimal Call
```bash
# Test with curl or fetch before implementing
curl -X GET "https://api.example.com/v1/resource" \
  -H "Authorization: Bearer $TOKEN"
```

### Step 4: Document in SCRATCHPAD

```markdown
## API Verification: [Service Name]
- Docs: [url]
- Version: [version]
- Verified: [date]
- Notes: [any quirks]
```

## Common Mistakes to Avoid

- ❌ Trusting Claude's training data for API details
- ❌ Using outdated examples from blogs
- ❌ Assuming v1 and v2 are compatible
- ❌ Skipping auth verification

## Exit Criteria

- [ ] Official docs found and reviewed
- [ ] Endpoint tested with real call
- [ ] Auth method verified
- [ ] Documented in SCRATCHPAD
