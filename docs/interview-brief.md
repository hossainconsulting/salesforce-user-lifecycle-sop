# Interview Brief — Salesforce Administrator

Use these as evidence prompts, not a script. Rehearse aloud and keep every claim within the repository evidence.

## Frame the experience honestly

> I don't yet have commercial Salesforce employment. My evidence comes from certifications, a capstone, and self-directed Salesforce simulations where I work through tickets, document decisions, test the result, and record what I would improve. SunRise Solar is one of those fictional scenarios, not an employer.

## Documenting a process

**Situation:** User provisioning and offboarding in my training org involved more than creating or disabling a login.  
**Task:** Produce a procedure another administrator could execute and verify.  
**Action:** I wrote a versioned SOP covering licence checks, least-privilege access, identity and business fields, permission set groups, MFA, positive and negative testing, freeze, ownership transfer, dependency review, deactivation, and evidence. Each control connects to a failure or ambiguity I encountered.  
**Result:** The work became repeatable and reviewable. My v1.1 review also corrected two overstatements: records are not literally orphaned when an owner becomes inactive, and `Login As` is a conditional test method rather than a universal requirement.

## A mistake and the control it produced

> Salesforce saved a user record successfully, but requested fields such as Role, Manager, and Title were incomplete. I had treated a successful transaction as proof of a correct business outcome. I changed the definition of done: compare the completed identity, access bundle, queues, and groups with the approved request, then test required access and a meaningful forbidden action. The lesson applies beyond Salesforce—technical success is not acceptance evidence.

## Offboarding approach

> I start from an approved exit request and its effective time. If access must stop immediately, I freeze the account and revoke sessions and external identity access according to policy. I transfer record and work ownership, remove routing and group memberships, clear both blocking and silent dependencies, deactivate, and then verify. Salesforce retains records owned by inactive users, but stale ownership can still damage routing, reports, automation, and accountability. I therefore don't rely only on whatever error appears when I click Deactivate.

## Pushing back with evidence

> When requested wording or attribution could not be substantiated from the available evidence, I recorded the discrepancy and used only what I could verify. I apply the same rule to certification status, project results, dates, and business metrics. If evidence is missing, I label the field `VERIFY` rather than filling the gap with an assumption.

## Questions for the interviewer

1. How is Salesforce access designed here—minimum-access profiles plus permission set groups, another model, or a migration between them?
2. What is the approved offboarding boundary between HR or identity operations and the Salesforce team, and who owns record transfer and scheduled automation checks?

## Do not claim

- Commercial Salesforce employment or client outcomes not evidenced
- Production use of the fictional SunRise company
- Certification status without a verifiable credential
- Measured improvements that were not actually measured
- Universal platform rules when the behaviour depends on org configuration or policy
