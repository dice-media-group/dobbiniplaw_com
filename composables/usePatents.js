import { ref } from 'vue';

// Minimal fallback data in case everything fails
const minimalFallbackPatents = [
  {
    title: "Monolithic LED Chip to Emit Multiple Colors",
    description: "A light emitting diode chip with red, green and blue light emission regions on a single substrate.",
    image: "/img/led-chip.png",
    patentNumber: "7,271,420",
    linkText: "Patent 7,271,420",
    order: 1
  }
];

export function usePatents() {
  // Data refs
  const patents = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const fromMarkdown = ref(false);

  // Fetch patent data from the consolidated JSON file
  const fetchPatents = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      console.log('Fetching patents from consolidated JSON...');
      const timestamp = Date.now(); // To bypass cache
      
      // Try to fetch the consolidated patents.json file
      const jsonResponse = await fetch(`/_content/patents.json?_hash=${timestamp}`);
      
      if (jsonResponse.ok) {
        const jsonData = await jsonResponse.json();
        console.log('Patents data loaded successfully');
        
        if (jsonData && jsonData.patents && Array.isArray(jsonData.patents) && jsonData.patents.length > 0) {
          // Process the data to ensure all fields are present
          const processedData = jsonData.patents.map(patent => ({
            title: patent.title || '',
            description: patent.description || '',
            image: patent.image || '',
            fallbackImage: patent.fallbackImage || '',
            patentNumber: patent.patentNumber || '',
            linkText: patent.linkText || `Patent ${patent.patentNumber || ''}`,
            order: patent.order || 0
          }));
          
          // Sort by order
          processedData.sort((a, b) => (a.order || 0) - (b.order || 0));
          
          patents.value = processedData;
          console.log(`Loaded ${processedData.length} patents from JSON`);
          return;
        }
      }
      
      // If we get here, the JSON file failed to load
      console.error('Failed to load patents.json, using minimal fallback');
      patents.value = minimalFallbackPatents;
      
    } catch (err) {
      console.error('Error fetching patents:', err);
      error.value = err.message;
      patents.value = minimalFallbackPatents;
    } finally {
      isLoading.value = false;
    }
  };

  // Force refresh content (for debugging or manual refresh)
  const refreshPatents = async () => {
    await fetchPatents();
  };

  return {
    patents,
    isLoading,
    error,
    fromMarkdown,
    fetchPatents,
    refreshPatents
  };
}