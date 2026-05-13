# Architecture Overview - Genesis v5

## 1. System Context
The Expoint ecosystem now includes an intelligence layer designed to capture, process, and evaluate user behavior patterns.

## 2. Component Decomposition

### [SYS-IMS] Interaction Monitoring System
- **Responsibility**: Real-time capture of user actions (clicks, inputs, scrolls).
- **Source Root**: `src/lib/services/analytics/`
- **Boundary**: Client-side event emitters.
- **Dependencies**: [SYS-LOG] Data Logging Layer.

### [SYS-AI-VAL] AI Validation Pipeline
- **Responsibility**: Fetching session logs and generating optimization reports.
- **Source Root**: `src/app/api/analytics/evaluate/`
- **Boundary**: Server-side processing.
- **Dependencies**: PostHog API, LLM Provider (Gemini).

### [SYS-LOG] Data Logging Layer (Updated)
- **Responsibility**: Anonymizing and transmitting events to Data Sinks.
- **Source Root**: `src/lib/services/logging/`

## 3. Physical Code Structure
```text
src/
├── components/
│   └── analytics/           # Analytics Providers & Wrappers
├── lib/
│   ├── services/
│   │   ├── analytics/       # Event capture logic
│   │   └── logging/         # Data transmission & scrubbing
├── app/
│   └── api/
│       └── analytics/       # Evaluation endpoints for AI
```

## 4. Interaction Flow
1. User interacts with `CalculatorContainer`.
2. `IMS` captures the event.
3. `LOG` scrubs PII and enriches with `UserContext`.
4. Event is sent to `PostHog`.
5. AI Agent calls `/api/analytics/evaluate`.
6. AI processes logs and returns "Funnel Optimization Insights".
