import { ref } from 'vue';

// Fallback data in case content fetching fails
const fallbackPatents = [
  {
    title: "Monolithic LED Chip to Emit Multiple Colors",
    description: "A light emitting diode chip with red, green and blue light emission regions on a single substrate. The light emission regions may be powered selectively to only emit one color light at a time. Or all three regions may be powered simultaneously so that the LED chip emits white light.",
    image: "/img/prior-work/monolitholic-led-chip-1.png",
    patentNumber: "7,271,420",
    linkText: "Patent 7,271,420"
  },
  {
    title: "Magazine Grip",
    description: "A magazine grip attachment for ammunition magazines to aid in extraction of magazines from ammunition pouches, providing better grip and reducing noise.",
    image: "/img/prior-work/magazine-grip-1.png",
    patentNumber: "9,341,429",
    linkText: "Patent 9,341,429"
  },
  {
    title: "Firearm Gas System",
    description: "A gas system for a firearm comprising a hollow gas tube extending between a forward gas tap in a firearm's barrel and a rearward piston assembly to operate the bolt system.",
    image: "/img/prior-work/gas-system-1.png",
    patentNumber: "8,689,672",
    linkText: "Patent 8,689,672"
  },
  {
    title: "Quick-Change Barrel System",
    description: "A quick-change barrel system for firearms that allows rapid barrel replacement without special tools, increasing versatility and reducing maintenance time.",
    image: "/img/prior-work/Quick-Change-Barrel.png",
    patentNumber: "8,234,808",
    linkText: "Patent 8,234,808"
  }
];

export function usePatents() {
  // Data refs
  const patents = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const fromMarkdown = ref(false);
  const markdownPatents = ref([]);

  // Try direct content API access
  const fetchPatentsDirectly = async () => {
    try {
      console.log('Fetching patents directly...');
      // Try to directly access the content API
      const timestamp = Date.now(); // To bypass cache
      const response = await fetch(`/_content/query/patents?_params={"where":{"_extension":"md"},"sort":[{"order":1}]}&_hash=${timestamp}`);
      const data = await response.json();
      
      console.log('Direct API results:', data);
      if (data && Array.isArray(data) && data.length > 0) {
        markdownPatents.value = data;
        fromMarkdown.value = true;
        return data;
      }
      return [];
    } catch (err) {
      console.error('Error fetching patents directly:', err);
      error.value = err.message;
      return [];
    }
  };

  // Use Nuxt Content module to fetch patent data
  const fetchWithQueryContent = async () => {
    try {
      console.log('Fetching patents with queryContent...');
      const result = await queryContent('/patents')
        .where({ _extension: 'md' })
        .sort({ order: 1 })
        .find();
      
      console.log('Query result:', result);
      if (result && result.length > 0) {
        markdownPatents.value = result;
        fromMarkdown.value = true;
        return result;
      }
      return [];
    } catch (err) {
      console.error('Error querying content:', err);
      error.value = err.message;
      return [];
    }
  };

  // Load all patent files explicitly
  const loadAllPatentFiles = async () => {
    try {
      // Define all the patent files we know exist
      const patentFiles = [
        '/patents/1-monolithic-led-chip',
        '/patents/2-magazine-grip',
        '/patents/3-gas-system',
        '/patents/4-quick-change-barrel',
        '/patents/5-spring-loaded',
        '/patents/6-grip',
        '/patents/7-work-light',
        '/patents/8-stroller-passenger',
        '/patents/9-cable-storage',
        '/patents/10-modular-computer',
        '/patents/11-unoccupied-dwelling',
        '/patents/12-digital-support',
        '/patents/13-gan-layer'
      ];
      
      // Load each file individually
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
      
      console.log('Individually loaded patents:', loadedPatents);
      if (loadedPatents.length > 0) {
        // Sort by order
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

  // Main function to fetch patents using all available methods
  const fetchPatents = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      console.log('Fetching patents...');
      
      // Try all methods of loading content
      const directResult = await fetchPatentsDirectly();
      const queryResult = await fetchWithQueryContent();
      const individualResult = await loadAllPatentFiles();
      
      // Use whichever method returned patents
      if (directResult.length > 0) {
        console.log('Using direct API results');
        patents.value = directResult;
        fromMarkdown.value = true;
      } else if (queryResult.length > 0) {
        console.log('Using queryContent results');
        patents.value = queryResult;
        fromMarkdown.value = true;
      } else if (individualResult.length > 0) {
        console.log('Using individually loaded patents');
        patents.value = individualResult;
        fromMarkdown.value = true;
      } else {
        console.log('No markdown patents found, using fallback');
        patents.value = fallbackPatents;
        fromMarkdown.value = false;
      }
    } catch (err) {
      console.error('Error fetching patents:', err);
      error.value = err.message;
      patents.value = fallbackPatents;
      fromMarkdown.value = false;
    } finally {
      isLoading.value = false;
    }
  };

  // Force refresh content (for debugging or manual refresh)
  const refreshPatents = async () => {
    await fetchPatents();
  };

  // List all available content files (for debugging)
  const listPatentFiles = async () => {
    try {
      console.log('Listing all content files...');
      // This will list all available content files
      const allFiles = await queryContent().find();
      console.log('All content files:', allFiles);
      return allFiles;
    } catch (err) {
      console.error('Error listing content files:', err);
      return [];
    }
  };

  return {
    patents,
    isLoading,
    error,
    fromMarkdown,
    fetchPatents,
    refreshPatents,
    listPatentFiles
  };
}