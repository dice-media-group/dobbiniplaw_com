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
    const currentPath = route.path;
    console.log('Current route path:', currentPath);
    
    // Check if current path is in the whitelist
    const shouldShow = showCTAPages.includes(currentPath);
    console.log('Should show CTA:', shouldShow);
    
    // Check specific about page condition 
    if (currentPath === '/about') {
      console.log('On about page, CTA should be hidden');
      return false;
    }
    
    return shouldShow;
  });

  return {
    showCTA
  };
};

export default useCTA;
