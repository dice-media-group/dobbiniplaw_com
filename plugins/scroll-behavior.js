// plugins/scroll-behavior.js
export default defineNuxtPlugin(nuxtApp => {
  // Track when a navigation is in progress
  let navigationInProgress = false;

  // Function to scroll to top that respects render lifecycle
  const scrollToTop = () => {
    // First try using window.scrollTo
    window.scrollTo(0, 0);
    // As a backup, try document.documentElement.scrollTop
    document.documentElement.scrollTop = 0;
    // And document.body.scrollTop for older browsers
    document.body.scrollTop = 0;
  };

  // Apply scroll AFTER the page is fully rendered
  nuxtApp.hook('page:finish', () => {
    // Mark navigation as complete
    navigationInProgress = false;
    
    // Wait for render cycle to complete
    setTimeout(() => {
      scrollToTop();
    }, 10);
  });
  
  // Mark when navigation starts
  nuxtApp.hook('page:start', () => {
    navigationInProgress = true;
  });
  
  // Specially handle "app:mounted" for initial page load
  nuxtApp.hook('app:mounted', () => {
    // First time the app is mounted, scroll to top
    setTimeout(scrollToTop, 50);
  });

  // Additional Vue hook for after a page component is mounted
  nuxtApp.vueApp.mixin({
    mounted() {
      // Only do this for page components, not all components
      if (this.$route && navigationInProgress) {
        // Wait a bit longer to ensure all child components are rendered
        setTimeout(scrollToTop, 100);
      }
    }
  });

  // Provide the scrollToTop function for use in components
  return {
    provide: {
      scrollToTop: () => {
        // First, check if we're in a navigation
        if (navigationInProgress) {
          // If we're navigating, we'll let the page:finish hook handle it
          return;
        }
        
        // If not in navigation, do the scroll with a slight delay
        // to ensure any component updates are complete
        setTimeout(scrollToTop, 50);
      }
    }
  };
});