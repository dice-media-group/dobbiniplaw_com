import { useRoute, computed } from '#imports';

/**
 * Composable to provide CTA visibility control
 * Only shows CTA on explicitly listed pages
 * @returns {Object} CTA related properties and methods
 */
export const useCTA = () => {
  const route = useRoute();
  
  // Define pages that should show the CTA (whitelist approach)
  const showCTAPages = [
    '/',
    '/index',
    // Add other paths here where CTA should be shown
    // Example: '/testimonials', '/about', etc.
  ];
  
  // Only show CTA on whitelisted pages
  const showCTA = computed(() => {
    return showCTAPages.includes(route.path);
  });

  return {
    showCTA
  };
};

export default useCTA;
