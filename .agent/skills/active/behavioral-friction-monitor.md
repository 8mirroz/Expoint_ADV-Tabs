# Skill: Behavioral Friction Monitor

## Goal
Detect and log user frustration or confusion markers in complex interactive interfaces.

## Trigger Conditions
- Designing forms with multiple steps
- Implementing complex calculators or wizards
- Debugging drop-offs in the funnel

## Steps
1. **Rage Click Detection**: Track multiple rapid clicks on non-interactive or slow elements.
2. **Dead Loop Tracking**: Detect when a user cycles through the same steps 3+ times without progress.
3. **Hesitation Markers**: Measure time spent on a field vs. average segment baseline.
4. **Correction Frequency**: Log how many times a user changes their input before moving to the next step.
5. **Contextual Help Triggering**: Feed these signals into the UI to trigger proactive support (AI suggestions).

## Anti-Patterns
- Aggressive logging of every mouse move (use sampled or threshold-based triggers).
- Ignoring silent exits (calculate "time to bounce" from last activity).

## Success Criteria
- Identifying the top 3 "friction points" in the Calculator within 24h of traffic.
- Correlation between friction signals and conversion drop-offs verified.
