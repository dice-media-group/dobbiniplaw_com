import { ref } from 'vue';

export function usePatents() {
  const markdownPatents = ref([]);
  const allPatents = ref([]);
  const fromMarkdown = ref(false);
  const queryError = ref(null);
  
  // Define fallback patents
  const fallbackPatents = ref([
    {
      title: "Monolithic LED Chip to Emit Multiple Colors",
      description: "A light emitting diode chip with red, green and blue light emission regions on a single substrate. The light emission regions may be powered selectively to only emit one color light at a time. Or all three regions may be powered simultaneously so that the LED chip emits white light.",
      image: "/img/prior-work/monolitholic-led-chip-1.png",
      patentNumber: "7,271,420",
      linkText: "Patent 7,271,420"
    },
    // ... add other fallback patents here ...
  ]);

  const fetchPatentsDirectly = async () => {
    try {
      console.log('Fetching patents directly...');
      const timestamp = Date.now();
      const response = await fetch(`/_content/query/patents?_params={"where":{"_extension":"md"},"sort":[{"order":1}]}&_hash=${timestamp}`);
      const data = await response.json();
      
      if (data && Array.isArray(data) && data.length > 0) {
        markdownPatents.value = data;
        fromMarkdown.value = true;
        return data;
      }
      return [];
    } catch (err) {
      console.error('Error fetching patents directly:', err);
      queryError.value = err.message;
      return [];
    }
  };

  const fetchPatents = async () => {
    try {
      console.log('Fetching patents with queryContent...');
      const result = await queryContent('/patents')
        .where({ _extension: 'md' })
        .sort({ order: 1 })
        .find();
      
      if (result && result.length > 0) {
        markdownPatents.value = result;
        fromMarkdown.value = true;
        return result;
      }
      return [];
    } catch (err) {
      console.error('Error querying content:', err);
      queryError.value = err.message;
      return [];
    }
  };

  const loadAllPatentFiles = async () => {
    try {
      const patentFiles = [
        '/patents/1-monolithic-led-chip',
        '/patents/2-magazine-grip',
        '/patents/3-gas-system',
        // ... add other patent files ...
      ];
      
      const loadedPatents = [];
      for (const path of patentFiles) {
        try {
          const result = await queryContent(path).find();
          if (result && result.length > 0) {
            loadedPatents.push(result[0]);
          }
        } catch (error) {
          console.error(`Error loading ${path}:`, error);
        }
      }
      
      if (loadedPatents.length > 0) {
        loadedPatents.sort((a, b) => (a.order || 999) - (b.order || 999));
        markdownPatents.value = loadedPatents;
        fromMarkdown.value = true;
        return loadedPatents;
      }
      return [];
    } catch (err) {
      console.error('Error loading patent files:', err);
      return [];
    }
  };

  const refreshContent = async () => {
    try {
      const directResult = await fetchPatentsDirectly();
      const queryResult = await fetchPatents();
      const individualResult = await loadAllPatentFiles();
      
      if (directResult.length > 0) {
        allPatents.value = directResult;
      } else if (queryResult.length > 0) {
        allPatents.value = queryResult;
      } else if (individualResult.length > 0) {
        allPatents.value = individualResult;
      } else {
        allPatents.value = fallbackPatents.value;
        fromMarkdown.value = false;
      }
    } catch (err) {
      console.error('Error refreshing content:', err);
      queryError.value = err.message;
      allPatents.value = fallbackPatents.value;
      fromMarkdown.value = false;
    }
  };

  return {
    markdownPatents,
    allPatents,
    fromMarkdown,
    queryError,
    fetchPatentsDirectly,
    fetchPatents,
    loadAllPatentFiles,
    refreshContent,
    fallbackPatents
  };
}