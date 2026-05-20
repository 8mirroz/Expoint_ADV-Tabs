import { describe, expect, it } from 'vitest';
import {
  TURNSTILE_TEST_SITE_KEY,
  normalizeTurnstileSiteKey,
} from './TurnstileWidget';

describe('normalizeTurnstileSiteKey', () => {
  it('falls back from placeholder keys during local development', () => {
    const result = normalizeTurnstileSiteKey('0x4AAAA...');

    expect(result.siteKey).toBe(TURNSTILE_TEST_SITE_KEY);
    expect(result.isFallback).toBe(true);
  });

  it('keeps a valid site key unchanged', () => {
    const siteKey = '1x00000000000000000000AA';
    const result = normalizeTurnstileSiteKey(siteKey);

    expect(result.siteKey).toBe(siteKey);
    expect(result.isFallback).toBe(false);
  });
});
