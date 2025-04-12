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

  // Main function to fetch patents using available methods
  const fetchPatents = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      console.log('Fetching patents...');
      
      // Try direct API method 
      const directResult = await fetchPatentsDirectly();
      
      // Use direct result or fallback
      if (directResult.length > 0) {
        console.log('Using direct API results');
        patents.value = directResult;
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
      // This will attempt to list all available content files but won't work
      // without queryContent, just keeping for API compatibility
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