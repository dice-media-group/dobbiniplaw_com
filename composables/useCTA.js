import { useRoute, computed } from '#imports';

/**
 * Composable to provide CTA visibility control
 * Only shows CTA on the home page (index.vue)
 * @returns {Object} CTA related properties and methods
 */
export const useCTA = () => {
  const route = useRoute();
  
  // Only show CTA on the home page
  const showCTA = computed(() => {
    return route.path === '/' || route.path === '/index';
  });

  return {
    showCTA
  };
};

export default useCTA;
