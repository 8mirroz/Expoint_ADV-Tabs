# Research: Data Logging Layer (Consent DB)

## GDPR & 152-FZ Consent Logging Schema Best Practices
1. **Accountability & Traceability**: Must prove if, when, and how consent was given.
2. **Immutability**: Append-only design. Status changes (withdrawn, expired) are new records, not overwrites of old records.
3. **Data Localization (152-FZ)**: Primary database MUST be located in the Russian Federation.
4. **Schema Recommendations**:
   - `consent_id`: PK
   - `user_id`: Pseudonymized FK
   - `purpose_id`: Granular purpose (e.g., marketing, analytics)
   - `status`: GRANTED, WITHDRAWN
   - `timestamp`: UTC DateTime
   - `source_method`: Where the consent came from (e.g., form_id)
   - `policy_version`: Version of privacy policy accepted.
   - `metadata`: JSON blob for extra context (User Agent, exact text shown).
5. **Security**: Encrypt in transit and at rest. Strict Role-Based Access Control (RBAC).
6. **Data Minimization & Erasure**: Automated cleanup for expired records. Ability to delete PII while keeping the anonymized consent audit trail.
