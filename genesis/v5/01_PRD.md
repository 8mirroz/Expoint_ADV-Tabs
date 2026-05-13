# PRD - Genesis v5: AI-Ready Behavioral Analytics

## 1. Vision
Transform Expoint from a static lead-capture site into a data-rich behavioral laboratory. By capturing every high-fidelity interaction in an "AI-consumable" format, we enable autonomous optimization of the sales funnel and personalized user journeys.

## 2. User Stories
- **As a Business Owner**, I want to see which parts of the 902-PP Audit Wizard cause the most friction, so I can simplify them.
- **As an AI Analyst**, I want to receive structured JSON-L logs of user sessions with full context, so I can predict lead quality before the form is submitted.
- **As a User**, I want my data to be captured anonymously and securely (152-FZ), while still benefiting from a site that improves based on my needs.

## 3. Functional Requirements

### [REQ-ANL-001] Event Capturing System
- **Description**: Implement a global interaction listener for clicks, scrolls (depth), and form inputs (masked).
- **Acceptance Criteria**:
  - GIVEN a user clicks a button
  - WHEN the click occurs
  - THEN an event is dispatched with `target_id`, `component_name`, and `timestamp`.

### [REQ-ANL-002] Rich Context Enrichment
- **Description**: Every event must carry the current "User State".
- **Acceptance Criteria**:
  - GIVEN an event is captured
  - THEN it must include `segment` (e.g., Horeca), `theme` (Light/Dark), and `consent_status`.

### [REQ-ANL-003] AI-Ready Data Export
- **Description**: Provide an endpoint or integration that outputs data in a non-proprietary, flat structure (JSON-L).
- **Acceptance Criteria**:
  - GIVEN an AI agent requests logs
  - THEN the system provides a structured file/stream formatted for LLM tokenization efficiency.

### [REQ-ANL-004] Compliance & Anonymization
- **Description**: Strip PII (names, phones) from behavioral logs before they reach the DataSink.
- **Acceptance Criteria**:
  - GIVEN a user fills a phone field
  - WHEN the "change" event is logged
  - THEN the value must be masked (e.g., `+7 (***) ***-**-**`) unless explicit "Sales" consent is given.

## 4. Non-Functional Requirements
- **Performance**: Analytics scripts must not increase TBT (Total Blocking Time) by more than 50ms.
- **Reliability**: Use "Beacon API" or `requestIdleCallback` to ensure logs are sent without blocking navigation.
- **Privacy**: Full compliance with 152-FZ (no server-side storage of raw IP addresses in analytics).

## 5. Success Metrics
- 100% coverage of interactive elements in the Calculator and Audit Wizard.
- Successful ingestion of 10+ sessions by an AI agent with 90%+ data readability score.
