# PRD - Global Remediation Implementation (Genesis v4)

## 1. Product Goals
Ensure the Expoint ADV platform is fully compliant with Russian Federation legal requirements (152-FZ) and possesses a hardened security posture.

## 2. Scope & Requirements

### [REQ-001] Legal Pages and Consent
- **Given** a user navigates to the website,
- **When** they look for legal information or fill out a form,
- **Then** they must have access to the Privacy Policy, Cookie Policy, Terms of Service, and explicit, non-prefilled checkboxes for personal data processing and marketing consent.

### [REQ-002] Consent Logging
- **Given** a user submits a form,
- **When** the consent checkbox is checked,
- **Then** the system must log the consent event (form_id, consent_type, version, timestamp, IP, user_agent, page_url, fields) into a localized database.

### [REQ-003] Cookie Consent Management
- **Given** a user visits the site for the first time,
- **When** the page loads,
- **Then** a cookie banner must be displayed allowing categorization (Necessary, Analytics, Marketing), and third-party scripts must be blocked until explicit consent is given.

### [REQ-004] Data Localization
- **Given** a Russian citizen provides personal data,
- **When** the data is processed,
- **Then** the primary processing and storage must occur on a database physically located within the Russian Federation before any cross-border transfer.

### [REQ-005] Security Hardening
- **Given** the application and infrastructure,
- **When** deployed to production,
- **Then** it must implement HTTPS, 2FA for admin access, regular backups with tested restoration, rate limiting, and standard security headers (HSTS, CSP, X-Frame-Options).

## 3. Non-Functional Requirements
- **Security**: Must pass baseline security audit and penetration testing.
- **Compliance**: Must satisfy Roskomnadzor audit requirements.
- **Performance**: Security headers and rate limiting should not degrade standard user experience.
