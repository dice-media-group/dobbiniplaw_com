<template>
  <div class="patents-coming-soon text-center py-12">
    <h1 class="text-3xl font-bold mb-6">Patent Browser Coming Soon</h1>
    <p class="text-lg mb-8">Our Netflix-style patent browser is under development.</p>
    <p>Check back soon to explore our extensive patent portfolio in an interactive visual format.</p>
    
    <!-- 
    Uncomment the following to display progress for development purposes
    <div class="mt-8 text-left max-w-lg mx-auto">
      <h2 class="text-xl font-semibold mb-4">Development Status:</h2>
      <ul class="list-disc pl-6 space-y-2">
        <li>✅ Initial components created</li>
        <li>✅ Data structure defined</li>
        <li>⏳ Patent categorization in progress</li>
        <li>⏳ Image pipeline setup in progress</li>
        <li>🔜 Integration with Google Patents API</li>
      </ul>
    </div>
    -->
  </div>
</template>

<script setup>
/* 
 * Netflix-style Patent Browser (in development)
 * 
 * The actual implementation is commented out below to prevent build errors
 * until all dependencies and data are ready.
 * 
 * TODO:
 * 1. Process TrophyWall.pdf data
 * 2. Set up patent image pipeline
 * 3. Install missing dependencies
 * 4. Uncomment the implementation when ready
 */

/*
import { ref, computed, onMounted } from 'vue';
import PatentHero from '~/components/patents/PatentHero.vue';
import PatentCarousel from '~/components/patents/PatentCarousel.vue';
import PatentDetailModal from '~/components/patents/PatentDetailModal.vue';
import patentService from '~/services/patentService';

// State
const categories = ref([]);
const patentsMap = ref({});
const selectedPatent = ref(null);
const isLoading = ref(true);
const searchQuery = ref('');

// Computed properties
const featuredPatent = computed(() => {
  // Find first featured patent from any category
  for (const categoryId in patentsMap.value) {
    const categoryPatents = patentsMap.value[categoryId] || [];
    const featured = categoryPatents.find(p => p.featured);
    if (featured) return featured;
  }
  // Fallback to first patent if no featured patent is found
  const firstCategory = Object.keys(patentsMap.value)[0];
  return firstCategory ? (patentsMap.value[firstCategory][0] || null) : null;
});

const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value;
  
  const results = [];
  for (const category of categories.value) {
    const patents = getCategoryPatents(category.id);
    const filteredPatents = patents.filter(patent => 
      patent.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    
    if (filteredPatents.length > 0) {
      results.push(category);
    }
  }
  return results;
});

// Methods
function getCategoryPatents(categoryId) {
  if (!searchQuery.value) return patentsMap.value[categoryId] || [];
  
  return (patentsMap.value[categoryId] || []).filter(patent => 
    patent.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
}

function openPatentDetails(patent) {
  selectedPatent.value = patent;
}

function closePatentDetails() {
  selectedPatent.value = null;
}

function handleSearch() {
  // Implement debounce if needed
}

function clearSearch() {
  searchQuery.value = '';
}

// Lifecycle hooks
onMounted(async () => {
  try {
    isLoading.value = true;
    
    // Fetch categories - this will be implemented when ready
    // const categoriesModule = await import('~/content/patents/categories.json');
    // categories.value = categoriesModule.default.categories;
    
    // Mock data for development
    categories.value = [
      { id: 'firearms', name: 'Firearms & Accessories' },
      { id: 'medical', name: 'Medical Devices' },
      { id: 'electronics', name: 'Electronics & Technology' }
    ];
    
    // This will be implemented when sample data is ready
    // Fetch patents for each category
    // for (const category of categories.value) {
    //   try {
    //     const module = await import(`~/content/patents/${category.id}.json`);
    //     patentsMap.value[category.id] = module.default.patents;
    //   } catch (error) {
    //     console.error(`Error loading patents for category ${category.id}:`, error);
    //     patentsMap.value[category.id] = [];
    //   }
    // }
  } catch (error) {
    console.error('Error loading patent data:', error);
  } finally {
    isLoading.value = false;
  }
});
*/
</script>

<style scoped>
.patents-coming-soon {
  padding-top: 100px;
  min-height: 50vh;
}
</style>