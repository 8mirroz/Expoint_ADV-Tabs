# AntiQ v3 Audit Report: Expoint ADV

Run ID: `run_20260512_001`
Profile: `luxury`
Routing Source: `configs/orchestrator/router.yaml@v4.2`
Orchestration Path: `Quality Path`

## Scores
- Overall: **9.2**

### Dimensions
- **Cinematic Aesthetics**: 9.5
- **Technical Integrity**: 9.0
- **User Perception**: 9.0

## Findings

### [P2] Sub-optimal Navigation Font Size (F-001)
- **Evidence**: `text-[11px]` used in Header.tsx navigation links.
- **Impact**: Reduced readability for users with low vision or on non-high-DPI screens.
- **Fix**: Increase font size to `text-[12px]` or `text-[13px]`.
- **Owner**: UI Engineer
- **Verification**: Nav links font-size is at least 12px.

### [P2] Light Theme Navigation Contrast (F-002)
- **Evidence**: `text-on-surface-variant` on white surface in light mode.
- **Impact**: Potential WCAG contrast violation for active navigation elements.
- **Fix**: Use a darker slate color for default nav text in light mode.
- **Owner**: UI Engineer
- **Verification**: Contrast ratio of at least 4.5:1 for nav text.

## Recommendations
- **[Medium] R-001**: Increase nav items font size to 12px. (Improved legibility without compromising the industrial aesthetic.)
- **[Medium] R-002**: Audit contrast ratios for all small UI elements in light mode. (Full accessibility compliance (WCAG AA).)

## Determinism
- Hash: `6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b`
- Schema Version: `v3.0.0`
- Rules: `sort_findings_by_severity_then_id, sort_recommendations_by_priority_then_id, round_scores_to_single_decimal, canonical_json_sorted_keys, sha256_on_canonical_payload`

## Artifact Convention
- `logs/antiq-v3/runs/run_20260512_001/result.json`
- `logs/antiq-v3/runs/run_20260512_001/report.md`
