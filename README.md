# Salesforce User Lifecycle SOP

A recruiter-facing Salesforce administration case study covering user provisioning, access verification, freeze, record transfer, and deactivation.

> **Simulation disclosure:** SunRise Solar is a self-directed training simulation, not an employer or client. The Salesforce org and exercises are real; the company, tickets, and business scenario are fictional. No production or customer data is used.

## Why this exists

User lifecycle work is easy to treat as a sequence of Setup clicks. In practice, licence constraints, incomplete user records, hidden system references, work routing, record ownership, and scheduled automation turn it into an operational-risk problem. This SOP converts lessons from hands-on training tickets into a repeatable control.

## Evidence in this repository

| File | Purpose |
|---|---|
| [`docs/user-lifecycle-sop.md`](docs/user-lifecycle-sop.md) | Executable SOP v1.1 |
| [`docs/interview-brief.md`](docs/interview-brief.md) | Evidence-grounded interview rehearsal |
| [`profile.md`](profile.md) | Approved facts and hard limits for portfolio content |
| [`clone-worker/`](clone-worker/) | Draft portfolio assistant backend; not deployed |

## Decisions worth explaining

### Check the licence before configuring access

The user licence constrains available profiles and features. A spare Platform licence is not automatically a substitute for a Salesforce licence, and a permission set cannot grant capabilities excluded by the underlying licence. A shortage is escalated; another user is not deactivated merely to free a licence without completing offboarding controls.

### A successful save is not completion

Salesforce can save a user while requested business fields or access assignments remain incomplete. Completion therefore requires comparison with the approved request and a separate verification step. Access is built from a minimum-access baseline plus permission set groups and documented exceptions—not copied from another person.

### Freeze and deactivate solve different problems

Freeze prevents login while preserving the user record and licence assignment. Deactivation releases the licence after dependencies and ownership have been handled. The operational sequence is: **preserve evidence and access decision → freeze when immediate login prevention is required → transfer ownership and clear dependencies → deactivate → verify**. Record transfer must occur before deactivation; whether freeze precedes transfer depends on the urgency and the organisation's approved exit process.

## What changed in v1.1

- Permission set groups are the default for role-based access bundles; individual permission sets are exceptions.
- MFA enrolment and verification were added.
- Global Salesforce username uniqueness is documented.
- Dashboard running users, scheduled reports, scheduled jobs/Apex, integrations, and automation owners are included as manual checks.
- Queue and public-group membership is handled during onboarding and exit.
- The earlier absolute claim that deactivating first "orphans" records was corrected: Salesforce preserves record ownership, but inactive ownership can disrupt routing, reporting, maintenance, and accountability.
- `Login As` is conditional on policy and configuration; negative-permission testing is required regardless of method.

## Status

The core identity, public contact details, portfolio destination, and four Salesforce credentials are verified. Other `[VERIFY]` evidence fields in `profile.md` must remain unpublished until supported. The Worker is a reviewed draft only and must not be deployed until secrets, billing limits, privacy text, abuse controls, and the approved fact sheet are configured.

## Verified Salesforce credentials

- Salesforce Certified Agentforce Specialist — earned 18 August 2026
- Salesforce Certified Platform Administrator II — earned 10 August 2026
- Salesforce Certified Platform App Builder — earned 21 July 2026
- Salesforce Certified Platform Administrator — earned 23 June 2026

[View the public Salesforce credential record](https://trailhead.salesforce.com/en/credentials/certification-detail-print/?searchString=/EMytG9drkgo/H4/0tgVITa/sw2U8vhbkvkc3jqlaJgauY5cCr+PvNo4YAw1Ki9f).

## Contact

Hemayet Hossain · Sydney, Australia  
LinkedIn: <https://www.linkedin.com/in/hemayethossain> · Email: <mailto:hossainconsulting@gmail.com> · Portfolio: <https://portfolio.hossainconsulting.com/>
