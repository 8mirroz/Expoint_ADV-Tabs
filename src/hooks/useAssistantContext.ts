"use client";

import { useMemo } from 'react';
import { useCalculatorStore } from '../store/useCalculatorStore';
import { toAssistantContext } from '../lib/calculator-adapters';

export function useAssistantContext() {
  const projectState = useCalculatorStore();

  return useMemo(() => toAssistantContext(projectState), [projectState]);
}
