import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export * from 'gsap';
export { useGSAP } from '@gsap/react';
export { ScrollTrigger, ScrollToPlugin };
export default gsap;
