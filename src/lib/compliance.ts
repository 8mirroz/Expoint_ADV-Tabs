import { rules902PP, Rule902PP } from '@/data/rules_902pp';

export interface AuditParams {
  inHistoricCenter: boolean;
  onBalcony: boolean;
  overlapsWindows: boolean;
  isLightbox: boolean;
  height: number; // in meters
  lengthPercentage: number; // percentage of facade (0-100)
  absoluteLength: number; // in meters
}

export interface AuditResult {
  isCompliant: boolean;
  violations: Rule902PP[];
}

export function calculateCompliance(params: AuditParams): AuditResult {
  const violations: Rule902PP[] = [];

  for (const rule of rules902PP) {
    if (rule.id === 'rule-height-limit' && params.height > (rule.maxDimensions?.height || 0.5)) {
      violations.push(rule);
    }
    if (rule.id === 'rule-length-limit' && (params.lengthPercentage > 70 || params.absoluteLength > (rule.maxDimensions?.length || 15))) {
      violations.push(rule);
    }
    if (rule.id === 'rule-historic-center' && params.inHistoricCenter && params.isLightbox) {
      violations.push(rule);
    }
    if (rule.id === 'rule-balcony-placement' && params.onBalcony) {
      violations.push(rule);
    }
    if (rule.id === 'rule-overlap-windows' && params.overlapsWindows) {
      violations.push(rule);
    }
  }

  return {
    isCompliant: violations.length === 0,
    violations,
  };
}
