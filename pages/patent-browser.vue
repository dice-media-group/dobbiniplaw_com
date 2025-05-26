<template>
  <div class="bg-dobbin-gray text-white min-h-screen">
    <!-- Main Scrollable Content Container -->
    <main>
      <!-- Header with search and category filters -->
      <PatentBrowserHeader
        :searchQuery="searchQuery"
        :selectedCategoryId="selectedCategoryId"
        :selectionType="selectionType"
        :categoryDisplayName="categoryDisplayName"
        :showCategoriesDialog="showCategoriesDialog"
        @update:searchQuery="searchQuery = $event"
        @select-category="handleSelectCategory"
        @close-category="handleCloseCategory"
        @toggle-categories-dialog="handleToggleCategoriesDialog"
      />

      <!-- Featured Patent -->
      <PatentFeatured
        :patent="featuredPatent"
        :isLoading="isLoading"
        @view-details="selectPatent"
      />

      <!-- Categories and Patents -->
      <PatentCategoryList
        :categories="categories"
        :patentsMap="patentsMap"
        :subcategoriesMap="subcategoriesMap"
        :selectedCategoryId="selectedCategoryId"
        :searchQuery="searchQuery"
        :isLoading="isLoading"
        @select-patent="selectPatent"
      />
    </main>

    <!-- Categories Dialog -->
    <PatentCategoriesDialog
      :show="showCategoriesDialog"
      :categories="categories"
      @close="showCategoriesDialog = false"
      @select-category="handleSelectCategory"
    />

    <!-- Patent Detail Modal -->
    <PatentDetailModal
      :patent="selectedPatent"
      @close="closePatentDetail"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useHead } from '#app';
import PatentBrowserHeader from '~/components/patents/PatentBrowserHeader.vue';
import PatentFeatured from '~/components/patents/PatentFeatured.vue';
import PatentCategoryList from '~/components/patents/PatentCategoryList.vue';
import PatentCategoriesDialog from '~/components/patents/PatentCategoriesDialog.vue';
import PatentDetailModal from '~/components/patents/PatentDetailModal.vue';

// SEO metadata
useHead({
  title: 'Netflix-Style Patent Browser | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Explore our extensive patent portfolio in an interactive, Netflix-style browser. View patents by category, with detailed images and information.' }
  ]
});

// State variables
const categories = ref([]);
const patentsMap = ref({});
const subcategoriesMap = ref({}); // Store subcategories data
const selectedPatent = ref(null);
const isLoading = ref(true);
const searchQuery = ref('');

// Category UI state variables
const selectedCategoryId = ref(null);
const selectionType = ref(null); // 'direct' or 'dialog'
const categoryDisplayName = ref(''); // Store the display name separately
const showCategoriesDialog = ref(false);

// Featured patent computed property
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

// Select a category with selection type and display name
function handleSelectCategory({ categoryId, type = 'direct', displayName = '' }) {
  // First update the display name to ensure proper animation
  if (displayName) {
    categoryDisplayName.value = displayName;
  } else {
    const category = categories.value.find(c => c.id === categoryId);
    categoryDisplayName.value = category ? category.name : '';
  }
  
  // Then update the category ID and selection type
  selectedCategoryId.value = categoryId;
  selectionType.value = type;
  
  showCategoriesDialog.value = false;
}

// Close/clear the selected category
function handleCloseCategory() {
  selectedCategoryId.value = null;
  selectionType.value = null;
  categoryDisplayName.value = '';
}

// Toggle categories dialog
function handleToggleCategoriesDialog() {
  showCategoriesDialog.value = !showCategoriesDialog.value;
}

// Select a patent for viewing in detail modal
function selectPatent(patent) {
  selectedPatent.value = patent;
  
  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

// Close the patent detail modal
function closePatentDetail() {
  selectedPatent.value = null;
  
  // Re-enable body scrolling
  document.body.style.overflow = '';
}

// Data loading function
async function loadPatentData() {
  try {
    isLoading.value = true;
    
    // Fetch categories from the new data directory
    const categoriesModule = await import('~/data/patents/categories.json');
    categories.value = categoriesModule.default.categories.sort((a, b) => a.order - b.order);
    
    // No default selected category - set to null
    selectedCategoryId.value = null;
    selectionType.value = null;
    categoryDisplayName.value = '';
    
    // Fetch patents for each category
    const loadPromises = categories.value.map(async (category) => {
      try {
        // Try to import the category-specific JSON file from data directory
        const module = await import(`~/data/patents/${category.id}.json`);
        
        // Store patents for this category
        patentsMap.value[category.id] = module.default.patents || [];
        
        // Store subcategories for this category if available
        if (module.default.subcategories) {
          subcategoriesMap.value[category.id] = module.default.subcategories;
        }
        
        // Tag each patent with its category
        patentsMap.value[category.id].forEach(patent => {
          patent.category = category.id;
        });
        
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
    let patentsLoaded = Object.values(patentsMap.value).some(patents => patents.length > 0);
    
    if (!patentsLoaded) {
      try {
        const allPatentsModule = await import('~/data/patents/all-patents.json');
        const allPatents = allPatentsModule.default.patents || [];
        
        if (allPatents.length > 0) {
          // Group patents by category
          for (const patent of allPatents) {
            // Simple categorization logic based on patent title keywords
            let categoryId = 'other';
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
        }
      } catch (error) {
        console.error('Error loading all-patents.json:', error);
      }
    }
  } catch (error) {
    console.error('Error loading patent data:', error);
  } finally {
    isLoading.value = false;
  }
}

// Lifecycle hooks
onMounted(() => {
  loadPatentData();
  
  // Close categories dialog on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showCategoriesDialog.value = false;
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('keydown', () => {});
  // Ensure body scrolling is enabled when component is unmounted
  document.body.style.overflow = '';
});
</script>
