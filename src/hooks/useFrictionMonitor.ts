import { useEffect, useRef } from "react";
import { useAnalytics } from "@/hooks/useAnalytics";

interface FrictionConfig {
  rageClickThreshold?: number; // Number of clicks
  rageClickTimeframe?: number; // ms
  hesitationThreshold?: number; // ms before flagging hesitation
}

export function useFrictionMonitor(componentId: string, config?: FrictionConfig) {
  const { captureSignal } = useAnalytics();
  
  const rageClickThreshold = config?.rageClickThreshold || 3;
  const rageClickTimeframe = config?.rageClickTimeframe || 1000;
  const hesitationThreshold = config?.hesitationThreshold || 10000; // 10 seconds

  const clickCount = useRef(0);
  const lastClickTime = useRef(0);
  const mountTime = useRef(0);
  const hasHesitated = useRef(false);

  useEffect(() => {
    mountTime.current = Date.now();
    hasHesitated.current = false;
    
    const hesitationTimer = setTimeout(() => {
      if (!hasHesitated.current) {
        hasHesitated.current = true;
        captureSignal({
          topic: "compliance",
          priority: "P2",
          payload: {
            component: componentId,
            action: "hesitation_detected",
            value: hesitationThreshold,
            time_spent_ms: Date.now() - mountTime.current
          }
        });
      }
    }, hesitationThreshold);

    return () => clearTimeout(hesitationTimer);
  }, [componentId, hesitationThreshold, captureSignal]);

  const recordClick = () => {
    const now = Date.now();
    
    if (now - lastClickTime.current > rageClickTimeframe) {
      // Reset if outside timeframe
      clickCount.current = 1;
    } else {
      clickCount.current += 1;
    }
    
    lastClickTime.current = now;

    if (clickCount.current >= rageClickThreshold) {
      captureSignal({
        topic: "compliance",
        priority: "P2",
        payload: {
          component: componentId,
          action: "rage_click_detected",
          value: clickCount.current,
          timeframe_ms: rageClickTimeframe
        }
      });
      // Reset to avoid firing constantly
      clickCount.current = 0;
    }
  };

  return { recordClick };
}
