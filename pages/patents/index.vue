<template>
  <div class="patent-browser bg-gray-900 text-white min-h-screen pb-20">
    <!-- Header -->
    <header class="flex items-center justify-between p-4 bg-black bg-opacity-40 fixed w-full z-10">
      <div class="text-2xl font-bold">Dobbin IP Law</div>
      <div class="flex items-center space-x-4">
        <div class="relative">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search patents..." 
            class="bg-black bg-opacity-50 px-4 py-2 rounded text-sm w-48 pl-10"
            @input="handleSearch"
          />
          <svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <div class="pt-16">
      <!-- Featured Patent Hero -->
      <patent-hero 
        v-if="featuredPatent"
        :patent="featuredPatent"
        @view-details="openPatentDetails"
      />

      <!-- Categories with Carousels -->
      <div class="px-8 py-4 space-y-12">
        <div v-if="isLoading" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
          <p class="mt-4">Loading patents...</p>
        </div>
        
        <template v-else>
          <div v-if="filteredCategories.length === 0 && searchQuery" class="text-center py-12">
            <p>No patents found matching "{{ searchQuery }}"</p>
            <button 
              @click="clearSearch" 
              class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Clear Search
            </button>
          </div>
          
          <patent-carousel 
            v-for="category in filteredCategories" 
            :key="category.id"
            :category="category"
            :patents="getCategoryPatents(category.id)"
            @patent-selected="openPatentDetails"
          />
        </template>
      </div>
    </div>

    <!-- Patent Detail Modal -->
    <patent-detail-modal
      v-if="selectedPatent"
      :patent="selectedPatent"
      :is-open="!!selectedPatent"
      @close="closePatentDetails"
    />
  </div>
</template>

<script setup>
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
    
    // Fetch categories
    const categoriesModule = await import('~/content/patents/categories.json');
    categories.value = categoriesModule.default.categories;
    
    // Fetch patents for each category
    for (const category of categories.value) {
      try {
        const module = await import(`~/content/patents/${category.id}.json`);
        patentsMap.value[category.id] = module.default.patents;
      } catch (error) {
        console.error(`Error loading patents for category ${category.id}:`, error);
        patentsMap.value[category.id] = [];
      }
    }
  } catch (error) {
    console.error('Error loading patent data:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.patent-browser {
  min-height: 100vh;
}
</style>