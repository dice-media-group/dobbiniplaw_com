import { ref } from 'vue';

// Fallback data in case content fetching fails
const fallbackPatents = [
  {
    title: "Monolithic LED Chip to Emit Multiple Colors",
    description: "A light emitting diode chip with red, green and blue light emission regions on a single substrate. The light emission regions may be powered selectively to only emit one color light at a time. Or all three regions may be powered simultaneously so that the LED chip emits white light.",
    image: "/img/led-chip.png",
    patentNumber: "7,271,420",
    linkText: "Patent 7,271,420"
  },
  {
    title: "Magazine Grip",
    description: "A magazine grip attachment for ammunition magazines to aid in extraction of magazines from ammunition pouches comprising a sleeve of resilient material molded in the general shape of a magazine yet with a smaller inner circumference than the circumference of a magazine so as to require the band to stretch over the magazine.",
    image: "/img/magazine-grip.png",
    patentNumber: "6,212,815",
    linkText: "Patent 6,212,815"
  },
  {
    title: "Gas System for an Automatic Firearm",
    description: "The present invention is a gas system for a firearm comprising a hollow gas tube extending between a forward gas tap in a firearm's barrel and a rearward piston assembly to impinge upon and operate the firearm's bolt operating system.",
    image: "/img/firearm-gas.png",
    patentNumber: "8,201,489",
    linkText: "Patent 8,201,489"
  },
  {
    title: "Security Mailbox",
    description: "The present invention is a security mailbox utilizing a combination package rest and security panel. A mail slot in the security panel prevents easy access to contents of the mailbox. The present invention may be utilized in situations other than mail delivery where security for contents is desired.",
    image: "/img/security-mailbox.png",
    patentNumber: "7,574,823",
    linkText: "Patent 7,574,823"
  }
];

export function usePatents() {
  // Data refs
  const patents = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const fromMarkdown = ref(false);
  const markdownPatents = ref([]);

  // Try fetching patent data from multiple possible sources
  const fetchPatentsDirectly = async () => {
    try {
      console.log('Fetching patents directly...');
      const timestamp = Date.now(); // To bypass cache
      
      // Try multiple approaches in sequence
      
      // 1. First try to get the patents.json file
      try {
        console.log('Trying to fetch patents.json...');
        const jsonResponse = await fetch(`/_content/patents.json?_hash=${timestamp}`);
        
        if (jsonResponse.ok) {
          const jsonData = await jsonResponse.json();
          console.log('Found patents.json:', jsonData);
          if (jsonData && jsonData.patents && Array.isArray(jsonData.patents) && jsonData.patents.length > 0) {
            return jsonData.patents;
          }
        }
      } catch (jsonErr) {
        console.log('No patents.json found, trying another approach');
      }
      
      // 2. Try to query patents directory content
      try {
        console.log('Trying to query patents directory...');
        const dirResponse = await fetch(`/_content/query?_params={"where":{"_path":{"$contains":"patents/"}},"sort":[{"order":1}]}&_hash=${timestamp}`);
        
        if (dirResponse.ok) {
          const dirData = await dirResponse.json();
          console.log('Patents directory query results:', dirData);
          
          if (dirData && Array.isArray(dirData) && dirData.length > 0) {
            // Process the data to ensure image paths are correct
            const processedData = dirData.map(patent => {
              // Process patent data to extract necessary fields from markdown frontmatter
              return {
                title: patent.title || '',
                description: patent.description || '',
                image: patent.image || '',
                patentNumber: patent.patentNumber || '',
                linkText: patent.linkText || `Patent ${patent.patentNumber || ''}`,
                order: patent.order || 0,
                _path: patent._path || ''
              };
            });
            
            // Sort by order if available
            processedData.sort((a, b) => (a.order || 0) - (b.order || 0));
            
            return processedData;
          }
        }
      } catch (dirErr) {
        console.log('Patents directory query failed, trying another approach');
      }
      
      // 3. As a last resort, try to fetch from a hardcoded list of files
      try {
        console.log('Trying to fetch individual patent files...');
        const fileNames = [
          '1-monolithic-led-chip',
          '2-magazine-grip',
          '3-gas-system',
          '4-security-mailbox'
        ];
        
        const patentPromises = fileNames.map(async (fileName) => {
          try {
            const fileResponse = await fetch(`/_content/patents/${fileName}.md?_hash=${timestamp}`);
            if (fileResponse.ok) {
              const fileData = await fileResponse.json();
              return fileData;
            }
          } catch (fileErr) {
            console.log(`Failed to fetch ${fileName}.md`);
            return null;
          }
        });
        
        const patentResults = await Promise.all(patentPromises);
        const validPatents = patentResults.filter(p => p !== null);
        
        if (validPatents.length > 0) {
          console.log('Successfully fetched individual patent files:', validPatents);
          return validPatents;
        }
      } catch (filesErr) {
        console.log('Individual files approach failed');
      }
      
      // If we get here, all approaches failed
      console.log('All content fetch approaches failed, using fallback data');
      return [];
    } catch (err) {
      console.error('Error fetching patents directly:', err);
      error.value = err.message;
      return [];
    }
  };

  // Main function to fetch patents using available methods
  const fetchPatents = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      console.log('Fetching patents...');
      
      // Try direct API method 
      const directResult = await fetchPatentsDirectly();
      
      // Use direct result or fallback
      if (directResult && directResult.length > 0) {
        console.log('Using direct API results, found', directResult.length, 'patents');
        patents.value = directResult;
        fromMarkdown.value = true;
      } else {
        console.log('No content patents found, using fallback data');
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
      return [];
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