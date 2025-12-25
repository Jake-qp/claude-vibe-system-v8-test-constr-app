---
name: integration
description: Third-party API integration patterns
triggers:
  - External API integration
  - SDK usage
generates: null
---

# Integration Skill

Integrate third-party services reliably.

## When This Skill Activates

- Adding external APIs
- Payment integrations
- OAuth providers

## Integration Checklist

Before integrating:
- [ ] API verified (skill: verify-api)
- [ ] Rate limits understood
- [ ] Error responses documented
- [ ] Sandbox/test mode available

During integration:
- [ ] API keys in environment variables
- [ ] Timeout handling
- [ ] Retry logic with backoff
- [ ] Circuit breaker for failures

After integration:
- [ ] Documented in API-CONTRACTS.md
- [ ] Monitoring for errors
- [ ] Alerting on failures

## Pattern: API Wrapper

```typescript
class ExternalAPI {
  private baseUrl: string;
  private apiKey: string;

  async request(endpoint: string, options: RequestInit) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      throw new ExternalAPIError(response.status, await response.text());
    }

    return response.json();
  }
}
```

## Exit Criteria

- [ ] API wrapper with error handling
- [ ] Timeouts configured
- [ ] Secrets in env vars
- [ ] Integration documented
