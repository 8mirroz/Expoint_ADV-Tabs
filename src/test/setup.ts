import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock fetch globally
global.fetch = vi.fn();

// Mock environment variables
process.env.TURNSTILE_SECRET_KEY = '0x4AAAA...';
process.env.LOG_INGRESS_SECRET = 'test-secret';

// Mock IntersectionObserver
class IntersectionObserverMock {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
  unobserve() {}
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
