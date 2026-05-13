# Exploration Report: AI-Ready Layer Architecture

**Date**: 2026-05-11
**Explorer**: AI Explorer (Antigravity)

---

## 1. Problem & Scope

**Core Question**: How to design an AI-Ready Layer for a B2B SaaS platform (Expoint ADV) that integrates seamlessly with a NotebookLM knowledge base, provides a premium chat experience, and assists in the conversion funnel?

**Exploration Scope**:
- Included: Frontend streaming architectures (Vercel AI SDK), RAG (Retrieval-Augmented Generation) patterns, Context injection (passing UI state to the LLM).
- Excluded: Deep training of foundational models (we rely on NotebookLM/LLMs).

---

## 2. Key Insights

1. **Streaming is Mandatory for UX**: Waiting 5-10 seconds for an LLM response is unacceptable. The UI must use Server-Sent Events (SSE) to stream tokens as they are generated.
2. **Context is King**: A generic chatbot is useless. The AI must be "aware" of the user's current context:
   - What page are they on?
   - What segment (e.g., HoReCa) are they looking at?
   - What is the current state of their Sign Configurator?
3. **Structured Outputs (Generative UI)**: Modern AI integrations don't just return text; they return UI components. If a user asks "Show me premium options", the AI should stream back a React component showing the Premium Packages, not just a markdown list.

---

## 3. Best Practices & Patterns

### 3.1 Frontend Integration
- **Vercel AI SDK**: The industry standard for React/Next.js AI integrations. Provides `useChat` hook which handles streaming, message state, and error recovery out-of-the-box.
- **Generative UI (RSC)**: Using React Server Components to stream fully interactive UI elements from the LLM.

### 3.2 Backend & Orchestration
- **Proxy Architecture**: NEVER call LLMs directly from the client. Always route through a backend API to protect API keys and inject system prompts securely.
- **RAG via NotebookLM**: 
  - User Query -> Backend API
  - Backend API queries NotebookLM for grounded facts (e.g., "What materials do we use for halo-lit signs?").
  - Backend API constructs prompt: `System Prompt + NotebookLM Context + User Context + User Query` -> LLM.
  - LLM streams response back to client.

### 3.3 Security & Constraints
- **Prompt Injection Prevention**: System prompts must strictly constrain the AI to only discuss outdoor advertising, pricing within the configurator, and company services.
- **Rate Limiting**: IP-based rate limiting on the chat API to prevent abuse and manage LLM costs.

---

## 4. Action Recommendations

| Priority | Recommendation | Reason |
|:--------:|----------------|--------|
| P0 | Adopt Vercel AI SDK (`useChat`) | Drastically reduces boilerplate for streaming and state management. |
| P0 | Implement Context Builder Utility | A function that gathers current page URL, configurator state, and segment to append as hidden context to the user's first message. |
| P1 | Design System Prompt Matrix | Define strict personas and constraints for the AI (e.g., "You are an expert technical sales engineer at Expoint..."). |
| P2 | Generative UI hooks | Allow the AI to trigger actions (e.g., `updateConfigurator({ letterType: 'halo_lit' })`). |

---

## 5. Limitations & To-Explore
- Native NotebookLM API limitations (currently NotebookLM has limited official API access; we may need a proxy or Gemini API with NotebookLM document embeddings).
