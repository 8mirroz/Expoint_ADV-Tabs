# TASK_ROUTING.md (Agent OS v3.1) — Expoint ADV Governance

## 1. Model Inventory & Roles

| Role | Model | Primary Responsibility |
|:---|:---|:---|
| **Architect** | DeepSeek R1 | ADRs, API Contracts, System Design |
| **Engineer** | DeepSeek V3 | Server logic, CLI, Complex Algorithms |
| **Design Lead** | Gemini Flash | UI/UX, Premium Styling, Motion |
| **Reviewer** | Mistral Small | Security Audit, Code Review, Quality Gate |
| **Routine Worker** | Gemini Flash | Configs, Boilerplate, Migrations |

## 2. Routing Matrix

### Path 1: ⚡ Fast Path (C1 - C2)
- **Scope**: Trivial edits, documentation, simple configs.
- **Workflow**: Direct execution + Self-verify.
- **Circuit Breaker**: 2 fails ➔ Upgrade to Quality Path.

### Path 2: 🔧 Quality Path (C3)
- **Scope**: Feature implementation, bug fixes, refactoring.
- **Workflow**: Ralph's Loop (N=3) + Reviewer Gate.
- **Circuit Breaker**: 2 review fails ➔ Upgrade to Swarm Path.

### Path 3: 🐝 Swarm Path (C4 - C5)
- **Scope**: Architecture changes, security-critical, cross-system.
- **Workflow**: Architect Plan ➔ Parallel Sprint ➔ Deep Review ➔ KI Update.

## 3. Ralph's Loop Integration
- Mandatory for C3-C5 tasks.
- Produces multiple variants, selects best based on `correctness`, `token_efficiency`, and `speed`.

## 4. Self-Learning Loop
- Post-task retrospective in `docs/ki/`.
- Pattern extraction to `docs/patterns/`.
