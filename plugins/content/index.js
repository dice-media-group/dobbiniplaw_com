// This plugin creates a custom composable for fetching content

export default defineNuxtPlugin((nuxtApp) => {
  // Function to fetch patents content
  const fetchPatents = async () => {
    try {
      // Use direct fetch API request
      const response = await fetch('/_content/query/patents?_params={"where":{"_extension":"md"},"sort":[{"order":1}]}');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching patents:', error);
      return [];
    }
  };

  // Provide our custom function to the app
  nuxtApp.provide('fetchPatents', fetchPatents);
});
