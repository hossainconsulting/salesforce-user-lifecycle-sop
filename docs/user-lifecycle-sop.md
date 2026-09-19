# Salesforce User Lifecycle SOP

**Version:** 1.1  
**Owner:** Hemayet Hossain  
**Scenario:** SunRise Solar — self-directed training simulation  
**Last reviewed:** 18 September 2026

## 1. Control principles

1. Work only from an approved request identifying the requester, user, business role, manager, start/end time, and required access.
2. Use least privilege: minimum-access baseline, permission set groups for standard bundles, and individual permission sets only for approved exceptions.
3. Never clone another user as the access-design method.
4. Separate implementation from verification and preserve evidence.
5. Never use real customer or employee data in the portfolio.

## 2. Provision a user

### 2.1 Validate the request

- Confirm legal/display name, email, globally unique username, alias, locale, time zone, language, title, department, role, manager, start date, and approved access bundle.
- Confirm the employment or contractor status and the identity source of truth.
- Confirm whether queues, public groups, teams, delegated administration, or integration access are required.
- Record the ticket or decision reference.

### 2.2 Check capacity and dependencies

- Check available licences before creating the user.
- Select the correct user licence first; it constrains profiles and available permissions.
- Do not substitute a different licence solely because it is available.
- Salesforce usernames must be unique across Salesforce environments, not only within the current org. Use the organisation's documented naming convention.

### 2.3 Create the identity in dependency order

1. Create the user with the correct licence and minimum-access profile.
2. Complete business attributes: role, manager, title, department, locale, language, and time zone.
3. Assign the approved permission set group(s).
4. Assign separately approved exception permission sets.
5. Add approved queue and public-group membership.
6. Configure feature-specific controls where required. Example: campaign-management permission alone may not replace the separate Marketing User setting for applicable operations.
7. Initiate the approved MFA enrolment path and confirm that the user can complete it. Follow the organisation's SSO and identity-provider design; do not create shared MFA factors.

### 2.4 Verify before handover

- Compare licence, profile, role, manager, permission set groups, exception sets, queues, and public groups against the request.
- Test the required positive actions and at least one important negative boundary.
- Use `Login As` only where enabled and permitted by policy. Otherwise use an approved test method or supervised user acceptance test.
- Confirm the user cannot access Setup or restricted records unless explicitly required.
- Record the checks, tester, time, result, and evidence location.

## 3. Changes during the lifecycle

- Treat role, manager, team, queue, group, licence, and access changes as new approved requests.
- Remove obsolete access before adding replacement access where feasible.
- Review exception permission sets and time-bound access.
- Re-run positive and negative access checks after material changes.

## 4. Offboard a user

### 4.1 Authorise and contain

- Confirm the approved exit request, effective time, records custodian, replacement owners, and any legal or investigation hold.
- If immediate access removal is required, freeze the user at the authorised time. Freezing blocks login but does not release the licence.
- Revoke active sessions, connected-app tokens, delegated access, API/integration credentials, and external identity-provider access as required by the organisation's runbook.

### 4.2 Transfer business ownership

- Transfer Accounts, Contacts, Leads, Opportunities, Cases, custom-object records, and other owned work using the organisation's approved tools.
- Reassign open tasks, events, approvals, pending work, and operational responsibilities.
- Update queues, public groups, teams, territories, account teams, opportunity teams, and manual sharing where applicable.
- Confirm reporting and business owners accept the transfer.

Salesforce retains records owned by inactive users; they are not literally orphaned. The risk is operational: stale ownership can damage routing, maintenance, reporting, accountability, and future automation.

### 4.3 Clear blocking and silent dependencies

Check applicable org configuration, including:

- Automated Case User and Default Case Owner
- Case and Lead assignment rule entries, including inactive rules
- Case escalation rules and actions, including inactive rules
- Web-to-Lead default creator
- Default Lead Owner
- Default Workflow User and other automation fallback users
- Approval, Flow, email-alert, integration, and scheduled automation references
- Dashboard running user
- Scheduled reports
- Scheduled Apex and other scheduled jobs
- Integration users, connected apps, named/external credentials, and API ownership
- Queue, public-group, territory, and team membership

Some references block deactivation; others fail or become stale without blocking it. Do not rely on the deactivation error message as the complete dependency inventory.

### 4.4 Deactivate and verify

1. Confirm ownership transfers and dependency checks are complete.
2. Deactivate the user.
3. Confirm login is unavailable and the expected licence is released.
4. Validate record ownership, queues, dashboards, schedules, automations, integrations, and reports.
5. Attach evidence and exceptions to the ticket; record follow-up owners and dates.

## 5. Evidence standard

Every lifecycle ticket records:

- Request and approver
- Implementer and verifier
- Before/after access state
- Licence, profile, permission set groups, exceptions, queues, and groups
- Positive and negative tests
- Ownership/dependency actions for offboarding
- Result, exceptions, follow-up owner, and date
- Sanitised screenshots or exports only when they add evidence

## 6. Version history

| Version | Date | Change |
|---|---|---|
| v0.9 draft | 26 Aug 2026 | Returned unfinished document to draft status |
| v0.9 draft | 2–3 Sep 2026 | Completed freeze/deactivate explanation and corrected section count |
| v1.0 | 18 Sep 2026 | Completed initial seven-section procedure |
| v1.1 | 18 Sep 2026 | Added PSGs, MFA, username rule, routing groups, silent dependencies, evidence controls, and corrected absolute ownership/Login As claims |

## 7. Limitations

- This SOP is based on a training org and must be adapted to an employer's edition, identity provider, licences, policies, installed packages, and regulatory obligations.
- UI labels and platform behaviour can change. Validate the runbook in a sandbox or training org before operational use.
- This is not evidence of commercial Salesforce employment.
