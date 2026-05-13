# Architecture Overview - Genesis v4 (Compliance & Security)

## 1. System Decomposition

The Compliance & Security remediation integrates directly into the existing v3 architecture.

### 1.1 Content Delivery & Frontend (Next.js)
- **Responsibility**: Displaying legal pages, rendering consent-aware cookie banners, and enforcing secure form submissions.
- **Path**: `src/app/` (legal pages like `/privacy`, `/terms`, `/cookies`), `src/components/compliance` (cookie banner, consent checkboxes).

### 1.2 Data Logging Layer (Backend API)
- **Responsibility**: Capturing form consent metadata securely.
- **Path**: `src/app/api/compliance/consent/route.ts`

### 1.3 Infrastructure & Security (DevOps)
- **Responsibility**: Enforcing rate limits, security headers, HTTPS, WAF, and automated backups.
- **Path**: `next.config.ts` (for headers), reverse proxy configs (nginx/docker), deployment scripts.

### 1.4 Theme & Styling System (Design System)
- **Responsibility**: Managing light/dark mode, typography, contrast, and icon sets for a premium UI.
- **Path**: `tailwind.config.ts`, `src/app/globals.css`, `src/components/theme/`

## 2. Dependency Graph
- The **Marketing/Analytics** layer now strictly depends on the **Cookie Consent Manager**.
- The **CRM/Lead Gen** layer strictly depends on the **Consent Logging Layer**.
- All **UI Components** depend on the **Theme & Styling System**.

## 3. Project Tree Updates

```text
Expoint_ADV Tabs/
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   └── compliance/   # Legal pages
│   │   └── api/compliance/   # Consent logging API
│   ├── components/
│   │   └── compliance/       # Cookie banner, checkboxes
├── docs/compliance/          # Internal and external compliance docs
└── docs/security/            # Security and access inventories
```
