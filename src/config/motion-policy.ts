export const motionPolicy = {
  get prefersReducedMotion() {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Base durations for animations, can be mapped or multiplied
  durations: {
    fast: 0.2,
    base: 0.5,
    slow: 0.8,
    cinematic: 1.2
  },

  // Eases
  eases: {
    premium: "power3.out",
    cinematic: "expo.out",
    bounce: "back.out(1.2)"
  }
};
