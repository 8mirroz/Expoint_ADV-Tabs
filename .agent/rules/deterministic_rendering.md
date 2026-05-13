# Rule: Deterministic Rendering

**Scope**: All React components.

## Mandates
- **No Impure Functions**: Never use `Math.random()`, `new Date()`, or UUID generation inside the render body.
- **Hydration Safety**: Ensure server and client output match exactly. Use `useEffect` for client-only state.
- **Stable Keys**: Use stable IDs for list rendering.
