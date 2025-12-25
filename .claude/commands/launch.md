---
description: Production readiness check. Usage: /launch
---

# /launch - Production Readiness Check

Verify this project is ready for real users.

---

## Checklist Categories

### 🔒 Security
Load skill: `.claude/skills/security/SKILL.md`

- [ ] Authentication implemented correctly
- [ ] Authorization on all protected routes
- [ ] No secrets in code (checked by pre-tool hook)
- [ ] HTTPS enforced
- [ ] Input validation on all endpoints
- [ ] Rate limiting configured
- [ ] CORS properly configured

**If handling user data:**
Load skill: `.claude/skills/compliance/SKILL.md`

### ⚡ Performance

- [ ] Database queries optimized (no N+1)
- [ ] Proper indexing on frequent queries
- [ ] Assets optimized (images, bundles)
- [ ] Caching strategy implemented
- [ ] Load testing done for expected traffic

### 🛡️ Reliability

- [ ] Error handling comprehensive
- [ ] Graceful degradation for non-critical features
- [ ] Health check endpoint exists
- [ ] Database backups configured
- [ ] Rollback plan documented

### 📊 Operations

Load skill: `.claude/skills/devops/SKILL.md`

- [ ] Logging structured and sufficient
- [ ] Monitoring/alerting configured
- [ ] CI/CD pipeline working
- [ ] Environment variables documented
- [ ] Deployment runbook exists

### 📝 Documentation

- [ ] README is current
- [ ] API documentation complete
- [ ] Setup instructions work on fresh machine
- [ ] Architecture decisions documented

---

## Generate Checklist

Create `docs/PRODUCTION-CHECKLIST.md` with:
- All items above
- Project-specific additions
- Sign-off sections

---

## Launch Blockers

**CRITICAL (must fix):**
- Any security issue
- Missing error handling on critical paths
- No rollback plan

**SHOULD FIX:**
- Missing monitoring
- Incomplete documentation
- Performance concerns

---

## After Launch

Add to .tasks:
- [ ] Monitor error rates for 24 hours
- [ ] Check performance metrics
- [ ] Gather initial user feedback
