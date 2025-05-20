// plugins/scroll-behavior.js
export default defineNuxtPlugin(nuxtApp => {
  const scrollToTop = () => {
    // First try using window.scrollTo
    window.scrollTo(0, 0);
    // As a backup, try document.documentElement.scrollTop
    document.documentElement.scrollTop = 0;
    // And document.body.scrollTop for older browsers
    document.body.scrollTop = 0;
  };

  // Force scroll on page changes
  nuxtApp.hook('page:finish', () => {
    // Use multiple timings for reliability
    scrollToTop(); // Immediate
    setTimeout(scrollToTop, 0); // Next tick
    setTimeout(scrollToTop, 50); // Short delay
    setTimeout(scrollToTop, 100); // Longer delay

    // Try to use the global function if available
    if (window.forceScrollToTop) {
      window.forceScrollToTop();
    }
  });

  // Provide the scrollToTop function for use in components
  return {
    provide: {
      scrollToTop: () => {
        scrollToTop();
        // Multiple timers for reliability
        setTimeout(scrollToTop, 0);
        setTimeout(scrollToTop, 50);
        setTimeout(scrollToTop, 100);
      }
    }
  };
});