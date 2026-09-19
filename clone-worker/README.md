# Portfolio Assistant Worker — Deployment Gate

**Status: draft, not approved for deployment.**

This Worker answers recruiter questions using only an approved fact sheet. It is not a digital clone, must not impersonate Hemayet, and must identify itself as an AI portfolio assistant.

## Corrections from the original draft

- Uses Cloudflare's native rate-limiting binding instead of a read-modify-write counter in Workers KV. KV is eventually consistent and is not an exact counter.
- Rejects unapproved origins without returning a misleading CORS origin.
- Limits actual request bytes as well as declared size.
- Adds upstream timeout, no-store and security headers, and restrained error logging.
- Keeps `claude-sonnet-5`, which is a current Anthropic API alias as of 18 September 2026; re-check before deployment.
- Treats `SYSTEM_PROMPT` as sensitive configuration, but recommends generating it only from the approved `profile.md` facts.

## Pre-deployment gates

- [ ] All `[VERIFY]` fields required by the assistant are resolved
- [ ] System prompt forbids invented facts, salary/start-date statements, and speaking for employers
- [ ] Page clearly labels the assistant as AI-generated
- [ ] Privacy notice explains what is sent to the model provider and advises visitors not to submit sensitive data
- [ ] Retention/logging settings reviewed
- [ ] Anthropic spend cap, alerts, model access, and acceptable-use requirements reviewed
- [ ] Cloudflare rate-limiting binding configured and tested
- [ ] Bot/abuse protection decision recorded
- [ ] CORS production domains confirmed; local origin added only for local development
- [ ] Automated tests cover method, origin, malformed input, size, rate limit, timeout, and upstream failure
- [ ] CEO approval recorded before custom-domain routing or public deployment

## Secret setup

Run from this directory only after the gates are complete:

```bash
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put SYSTEM_PROMPT
```

Use `npx wrangler` with a pinned development dependency in the final implementation rather than relying on an uncontrolled global install.

## DNS correction

Do not manually add a CNAME until the Worker routing choice is made. A Worker custom domain can create/manage the required DNS association, while a route attaches the Worker to an existing hostname pattern. Inventory current DNS and hosting first, then use one documented method.
