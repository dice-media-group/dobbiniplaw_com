<template>
  <div class="patent-browser relative">
    <!-- Loading Overlay -->
    <div v-if="isLoading" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dobbin-dark-green mx-auto mb-4"></div>
        <p class="text-xl font-semibold">Loading Patent Browser...</p>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="loadingError" class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <div class="text-red-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p class="text-xl font-semibold mb-2">Error Loading Patents</p>
        <p class="mb-4">{{ loadingError }}</p>
        <button 
          @click="retryLoading"
          class="bg-dobbin-dark-green hover:bg-dobbin-green text-white py-2 px-4 rounded font-bold"
        >
          Retry
        </button>
      </div>
    </div>

    <!-- Patent Search Header -->
    <div class="fixed top-0 left-0 right-0 z-40 bg-black bg-opacity-60 backdrop-filter backdrop-blur-sm">
      <div class="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between">
        <h1 class="text-white text-xl font-bold mb-2 md:mb-0">Dobbin IP Law | Patent Portfolio</h1>
        <div class="flex flex-wrap items-center gap-2">
          <!-- Category filter dropdown -->
          <div class="relative">
            <select
              v-model="categoryFilter"
              class="bg-gray-800 text-white px-4 py-2 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-dobbin-green pr-8"
            >
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          <!-- Search input -->
          <div class="relative flex-grow">
            <input 
              type="text"
              v-model="searchQuery"
              @input="handleSearch"
              placeholder="Search patents..."
              class="bg-gray-800 text-white px-8 py-2 rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-dobbin-green"
            />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <button 
              v-if="searchQuery || categoryFilter" 
              @click="clearFilters"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <span class="sr-only">Clear</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Featured Patent Hero -->
    <PatentHero 
      v-if="featuredPatent" 
      :patent="featuredPatent" 
      @click="openPatentDetails(featuredPatent)"
    />
    <div v-else-if="!isLoading" class="w-full h-80 bg-gray-900 flex items-center justify-center">
      <p class="text-gray-500 text-xl">Featured patent not available</p>
    </div>

    <!-- Categories and Patents -->
    <div class="bg-gray-900 pt-8 pb-24">
      <div class="container mx-auto px-4">
        <template v-if="!isLoading && filteredCategories.length === 0">
          <div class="text-center py-16">
            <p class="text-gray-400 text-xl">No patents found matching "{{ searchQuery }}"</p>
            <button 
              @click="clearFilters"
              class="mt-4 bg-dobbin-dark-green hover:bg-dobbin-green text-white px-4 py-2 rounded"
            >
              Clear Filters
            </button>
          </div>
        </template>
        
        <div v-else class="space-y-16">
          <div 
            v-for="category in filteredCategories" 
            :key="category.id"
            class="category-section"
          >
            <PatentCarousel 
              :category="category" 
              :patents="getCategoryPatents(category.id)"
              :showCounts="true"
              :showCategoryBadge="false"
              @patent-selected="openPatentDetails"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Patent Detail Modal -->
    <PatentDetailModal 
      v-if="selectedPatent"
      :patent="selectedPatent"
      :is-open="!!selectedPatent"
      @close="closePatentDetails"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useHead } from '#app';
import { useRoute, useRouter } from 'vue-router';
import PatentHero from '~/components/patents/PatentHero.vue';
import PatentCarousel from '~/components/patents/PatentCarousel.vue';
import PatentDetailModal from '~/components/patents/PatentDetailModal.vue';

// SEO metadata
useHead({
  title: 'Patent Browser | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Explore our extensive patent portfolio in an interactive, Netflix-style browser. View patents by category, with detailed images and information.' }
  ]
});

// Get route and router
const route = useRoute();
const router = useRouter();

// State
const categories = ref([]);
const patentsMap = ref({});
const selectedPatent = ref(null);
const isLoading = ref(true);
const searchQuery = ref('');
const categoryFilter = ref('');
const loadingError = ref(null);

// Performance optimizations
const debounceTimeout = ref(null);
const allPatentsCache = ref([]);

// Computed properties
const filteredCategories = computed(() => {
  // First filter by category if selected
  let result = categories.value;
  
  if (categoryFilter.value) {
    result = categories.value.filter(category => category.id === categoryFilter.value);
  }
  
  // Then filter by search query if provided
  if (searchQuery.value) {
    return result.filter(category => {
      const patents = getCategoryPatents(category.id);
      return patents.length > 0;
    });
  }
  
  return result;
});

const featuredPatent = computed(() => {
  // Use the featured patent from the selected category if available
  if (categoryFilter.value) {
    const categoryPatents = patentsMap.value[categoryFilter.value] || [];
    const featured = categoryPatents.find(p => p.featured);
    if (featured) return featured;
  }
  
  // Else, find first featured patent from any category
  for (const categoryId in patentsMap.value) {
    if (categoryFilter.value && categoryId !== categoryFilter.value) continue;
    
    const categoryPatents = patentsMap.value[categoryId] || [];
    const featured = categoryPatents.find(p => p.featured);
    if (featured) return featured;
  }
  
  // Fallback to first patent if no featured patent is found
  if (categoryFilter.value) {
    const categoryPatents = patentsMap.value[categoryFilter.value] || [];
    return categoryPatents[0] || null;
  }
  
  const firstCategory = Object.keys(patentsMap.value)[0];
  return firstCategory ? (patentsMap.value[firstCategory][0] || null) : null;
});

// Methods
function getCategoryPatents(categoryId) {
  let patents = patentsMap.value[categoryId] || [];
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    return patents.filter(patent => 
      patent.title.toLowerCase().includes(query) ||
      patent.id.toLowerCase().includes(query) ||
      (patent.abstract && patent.abstract.toLowerCase().includes(query))
    );
  }
  
  return patents;
}

function openPatentDetails(patent) {
  selectedPatent.value = patent;
  
  // Update URL with patent ID but don't navigate (for sharing/bookmarking)
  const query = { ...route.query, patent: patent.id };
  router.replace({ query });
}

function closePatentDetails() {
  selectedPatent.value = null;
  
  // Remove patent query parameter from URL
  const query = { ...route.query };
  delete query.patent;
  router.replace({ query });
}

function handleSearch() {
  // Debounce for better performance
  if (debounceTimeout.value) clearTimeout(debounceTimeout.value);
  
  debounceTimeout.value = setTimeout(() => {
    // No need to do anything special, computed properties handle the filtering
  }, 300);
}

function clearFilters() {
  searchQuery.value = '';
  categoryFilter.value = '';
}

function retryLoading() {
  loadingError.value = null;
  loadPatentData();
}

// Find patent by ID across all categories
function findPatentById(patentId) {
  // Use cache if available for performance
  if (allPatentsCache.value.length > 0) {
    return allPatentsCache.value.find(p => p.id === patentId);
  }
  
  for (const categoryId in patentsMap.value) {
    const patent = patentsMap.value[categoryId].find(p => p.id === patentId);
    if (patent) return patent;
  }
  return null;
}

// Main data loading function
async function loadPatentData() {
  try {
    console.log('Patent browser mounted, loading data...');
    isLoading.value = true;
    loadingError.value = null;
    
    // Get query param for patent selection
    const patentIdFromQuery = route.query.patent;
    const categoryFromQuery = route.query.category;
    
    if (categoryFromQuery) {
      categoryFilter.value = categoryFromQuery;
    }
    
    // Fetch categories
    const categoriesModule = await import('~/content/patents/categories.json');
    categories.value = categoriesModule.default.categories.sort((a, b) => a.order - b.order);
    console.log(`Loaded ${categories.value.length} categories:`, categories.value.map(c => c.name).join(', '));
    
    // Fetch patents for each category
    let patentsLoaded = false;
    
    // Build a list of promises to load all categories in parallel
    const loadPromises = categories.value.map(async (category) => {
      try {
        // Try to import the category-specific JSON file
        const module = await import(`~/content/patents/${category.id}.json`);
        patentsMap.value[category.id] = module.default.patents || [];
        
        // Tag each patent with its category
        patentsMap.value[category.id].forEach(patent => {
          patent.category = category.id;
        });
        
        if (patentsMap.value[category.id].length > 0) {
          patentsLoaded = true;
        }
        console.log(`Loaded ${patentsMap.value[category.id].length} patents for category ${category.name}`);
        
        return patentsMap.value[category.id];
      } catch (error) {
        console.error(`Error loading patents for category ${category.id}:`, error);
        patentsMap.value[category.id] = [];
        return [];
      }
    });
    
    // Wait for all category patents to load
    await Promise.all(loadPromises);
    
    // If no patents were loaded for categories, try loading from all-patents.json
    if (!patentsLoaded) {
      try {
        console.log('Attempting to load from all-patents.json...');
        const allPatentsModule = await import('~/content/patents/all-patents.json');
        const allPatents = allPatentsModule.default.patents || [];
        
        if (allPatents.length > 0) {
          console.log(`Loaded ${allPatents.length} patents from all-patents.json`);
          patentsLoaded = true;
          
          // Group patents by category
          for (const patent of allPatents) {
            // For demonstration, place each patent in a category (can modify as needed)
            let categoryId = 'other';
            
            // Simple categorization logic based on patent title keywords
            const title = patent.title.toLowerCase();
            if (title.includes('firearm') || title.includes('gun') || title.includes('rifle') || title.includes('pistol')) {
              categoryId = 'firearms';
            } else if (title.includes('medical') || title.includes('suction') || title.includes('massage') || title.includes('dental')) {
              categoryId = 'medical';
            } else if (title.includes('electronic') || title.includes('circuit') || title.includes('sensor') || title.includes('audio')) {
              categoryId = 'electronics';
            } else if (title.includes('manufacture') || title.includes('apparatus') || title.includes('system')) {
              categoryId = 'manufacturing';
            } else if (title.includes('tool') || title.includes('device')) {
              categoryId = 'tools';
            } else if (title.includes('sport') || title.includes('recreation') || title.includes('game')) {
              categoryId = 'sports';
            } else if (title.includes('home') || title.includes('house') || title.includes('furniture')) {
              categoryId = 'household';
            }
            
            // Tag the patent with its category
            patent.category = categoryId;
            
            // Initialize category array if needed
            if (!patentsMap.value[categoryId]) {
              patentsMap.value[categoryId] = [];
            }
            
            // Add patent to appropriate category
            patentsMap.value[categoryId].push(patent);
          }
          
          console.log('Patents categorized from all-patents.json');
        }
      } catch (error) {
        console.error('Error loading all-patents.json:', error);
        loadingError.value = 'Failed to load patent data. Please try again later.';
      }
    }
    
    // Build a cache of all patents for faster lookup
    allPatentsCache.value = [];
    for (const categoryId in patentsMap.value) {
      allPatentsCache.value.push(...patentsMap.value[categoryId]);
    }
    console.log(`Cached ${allPatentsCache.value.length} total patents for faster lookup`);

    // Check if we need to select a patent from the URL
    if (patentIdFromQuery) {
      const patentFromUrl = findPatentById(patentIdFromQuery);
      if (patentFromUrl) {
        selectedPatent.value = patentFromUrl;
      }
    }
    
  } catch (error) {
    console.error('Error loading patent data:', error);
    loadingError.value = 'Failed to load patent data. Please try again later.';
  } finally {
    isLoading.value = false;
    console.log('Patent browser data loading complete');
  }
}

// Watch for category filter changes to update the URL
watch(categoryFilter, (newCategory) => {
  if (newCategory) {
    router.replace({ 
      query: { 
        ...route.query, 
        category: newCategory 
      } 
    });
  } else {
    const query = { ...route.query };
    delete query.category;
    router.replace({ query });
  }
});

// Lifecycle hooks
onMounted(() => {
  loadPatentData();
});
</script>

<style scoped>
.patent-browser {
  @apply bg-gray-900;
  min-height: 100vh;
  padding-top: 4rem; /* Account for fixed header */
}

/* Full-width sections */
.category-section {
  @apply py-4;
}

/* Improved mobile spacing */
@media (max-width: 640px) {
  .patent-browser {
    padding-top: 6rem; /* Account for multi-line fixed header on mobile */
  }
}
</style>