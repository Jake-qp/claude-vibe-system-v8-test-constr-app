---
name: compliance
description: Regulatory compliance (GDPR, PCI, HIPAA)
triggers:
  - Personal data handling
  - Payment processing
  - Health data
generates: docs/COMPLIANCE.md
---

# Compliance Skill

Build applications that respect user rights and regulations.

## When This Skill Activates

- Collecting personal data
- Processing payments
- Handling health information
- International users

## GDPR Requirements

### User Rights
- [ ] Right to access (data export)
- [ ] Right to delete (account deletion)
- [ ] Right to correction (profile editing)
- [ ] Right to portability (data export format)

### Data Handling
- [ ] Consent before collection
- [ ] Purpose limitation
- [ ] Data minimization
- [ ] Storage limitation

### Implementation
```typescript
// Data access endpoint
GET /api/user/data-export
// Returns all user data in JSON

// Account deletion
DELETE /api/user/account
// Cascading delete of all user data
```

## PCI Compliance

For payment processing:
- [ ] Never store full card numbers
- [ ] Use tokenization (Stripe, etc.)
- [ ] HTTPS everywhere
- [ ] Access controls

```typescript
// ✅ Good: Use payment provider tokens
const { paymentIntentId } = await stripe.paymentIntents.create({
  amount: 1000,
  currency: 'usd',
});

// ❌ Bad: Storing card numbers
```

## Documentation

Create docs/COMPLIANCE.md:
```markdown
# Compliance Documentation

## Data Inventory
| Data | Purpose | Retention | Deletion |
|------|---------|-----------|----------|
| Email | Account | Account lifetime | On delete |

## User Rights Implementation
| Right | Endpoint | Status |
|-------|----------|--------|
| Access | GET /api/user/data | ✅ |
| Delete | DELETE /api/user | ✅ |
```

## Exit Criteria

- [ ] Data inventory documented
- [ ] User rights endpoints exist
- [ ] Consent flow implemented
- [ ] No unnecessary data collection
