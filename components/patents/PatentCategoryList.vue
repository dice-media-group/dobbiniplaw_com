<template>
  <div class="px-4 md:px-8 py-4 space-y-12 text-white">
    <div v-if="isLoading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
    
    <template v-else>
      <!-- When no category is selected, show all categories -->
      <template v-if="!selectedCategoryId">
        <div 
          v-for="category in displayedCategories" 
          :key="category.id" 
          class="category-row" 
          :data-category-id="category.id"
        >
          <h2 class="text-xl font-medium mb-4 text-white">{{ category.name }}</h2>
          <div class="relative">
            <button 
              v-if="canScrollLeft(category.id)"
              class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-full z-10"
              @click="scrollLeft(category.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div 
              :ref="el => { if(el) categoryRefs[category.id] = el }" 
              class="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              @scroll="updateScrollButtons(category.id)"
            >
              <div 
                v-for="patent in getCategoryPatents(category.id)" 
                :key="patent.id" 
                class="flex-none w-36 md:w-72 rounded overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                @click="$emit('select-patent', patent)"
              >
                <div v-if="hasRealImage(patent)" class="relative h-40 bg-black">
                  <img 
                    :src="getPatentImageSrc(patent)" 
                    :alt="patent.title" 
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div v-else class="relative h-40 patent-default-image">
                  <!-- Nothing here, the background styles will show the SVG -->
                </div>
                <div class="p-3 bg-dobbin-gray">
                  <h3 class="text-sm font-medium text-white line-clamp-2 h-10">{{ patent.title }}</h3>
                  <p class="text-xs text-gray-400">{{ patent.id }}</p>
                </div>
              </div>
              
              <div v-if="getCategoryPatents(category.id).length === 0" class="flex-none w-full flex items-center justify-center h-40 bg-dobbin-gray rounded">
                <p class="text-gray-400">No patents found in this category</p>
              </div>
            </div>
            
            <button 
              v-if="canScrollRight(category.id)"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-full z-10"
              @click="scrollRight(category.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </template>
      
      <!-- When a category is selected, show its subcategories -->
      <template v-else>
        <div 
          v-for="subcategory in displayedSubcategories" 
          :key="`${selectedCategoryId}-${subcategory.id}`" 
          class="subcategory-row" 
          :data-subcategory-id="`${selectedCategoryId}-${subcategory.id}`"
        >
          <h2 class="text-xl font-medium mb-4 text-white">{{ subcategory.name }}</h2>
          <div class="relative">
            <button 
              v-if="canScrollLeft(`${selectedCategoryId}-${subcategory.id}`)"
              class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-full z-10"
              @click="scrollLeft(`${selectedCategoryId}-${subcategory.id}`)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <div 
              :ref="el => { if(el) categoryRefs[`${selectedCategoryId}-${subcategory.id}`] = el }" 
              class="flex space-x-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              @scroll="updateScrollButtons(`${selectedCategoryId}-${subcategory.id}`)"
            >
              <div 
                v-for="patent in getSubcategoryPatents(selectedCategoryId, subcategory.id)" 
                :key="patent.id" 
                class="flex-none w-36 md:w-72 rounded overflow-hidden hover:scale-105 transition-transform cursor-pointer"
                @click="$emit('select-patent', patent)"
              >
                <div v-if="hasRealImage(patent)" class="relative h-40 bg-black">
                  <img 
                    :src="getPatentImageSrc(patent)" 
                    :alt="patent.title" 
                    class="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div v-else class="relative h-40 patent-default-image">
                  <!-- Nothing here, the background styles will show the SVG -->
                </div>
                <div class="p-3 bg-dobbin-gray">
                  <h3 class="text-sm font-medium text-white line-clamp-2 h-10">{{ patent.title }}</h3>
                  <p class="text-xs text-gray-400">{{ patent.id }}</p>
                </div>
              </div>
              
              <div v-if="getSubcategoryPatents(selectedCategoryId, subcategory.id).length === 0" class="flex-none w-full flex items-center justify-center h-40 bg-dobbin-gray rounded">
                <p class="text-gray-400">No patents found in this subcategory</p>
              </div>
            </div>
            
            <button 
              v-if="canScrollRight(`${selectedCategoryId}-${subcategory.id}`)"
              class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-full z-10"
              @click="scrollRight(`${selectedCategoryId}-${subcategory.id}`)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- If no subcategories are displayed (e.g., due to search) -->
        <div v-if="displayedSubcategories.length === 0" class="flex justify-center py-12">
          <p class="text-gray-400">No patents found matching your search criteria</p>
        </div>
      </template>
      
      <!-- Add padding at the bottom to ensure scrollability -->
      <div class="pb-16"></div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  patentsMap: {
    type: Object,
    required: true
  },
  subcategoriesMap: {
    type: Object,
    required: true
  },
  selectedCategoryId: {
    type: String,
    default: null
  },
  searchQuery: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['select-patent']);

const categoryRefs = reactive({});
const scrollState = reactive({});

// Computed property for displayed categories based on filters
const displayedCategories = computed(() => {
  let filtered = props.categories;
  
  // Filter by selected category if any
  if (props.selectedCategoryId) {
    filtered = filtered.filter(category => category.id === props.selectedCategoryId);
  }
  
  // Filter by search query if any
  if (props.searchQuery) {
    return filtered.filter(category => {
      const patents = getCategoryPatents(category.id);
      return patents.length > 0;
    });
  }
  
  return filtered;
});

// Computed property to get subcategories for the selected category
const displayedSubcategories = computed(() => {
  if (!props.selectedCategoryId || !props.subcategoriesMap[props.selectedCategoryId]) {
    return [];
  }
  
  const subcategories = props.subcategoriesMap[props.selectedCategoryId];
  return Object.keys(subcategories).map(subId => ({
    id: subId,
    name: subcategories[subId].name,
    patentCount: subcategories[subId].patents.length
  })).filter(sub => {
    // If there's a search query, filter subcategories with matching patents
    if (props.searchQuery) {
      const patents = getSubcategoryPatents(props.selectedCategoryId, sub.id);
      return patents.length > 0;
    }
    return true;
  });
});

// Check if a patent has actual images (not just placeholders)
function hasRealImage(patent) {
  if (!patent || !patent.images || patent.images.length === 0) {
    return false;
  }
  
  // Check if any image is a placeholder
  for (const image of patent.images) {
    if (typeof image === 'string' && image.includes('placeholder')) {
      return false;
    } else if (image.thumbnail && image.thumbnail.includes('placeholder')) {
      return false;
    } else if (image.hires && image.hires.includes('placeholder')) {
      return false;
    }
  }
  
  return true;
}

// Get patent image source
function getPatentImageSrc(patent) {
  if (hasRealImage(patent)) {
    const image = patent.images[0];
    
    // Handle both old and new image formats
    if (typeof image === 'string') {
      return image;
    } else if (image.thumbnail) {
      return image.thumbnail;
    } else if (image.hires) {
      return image.hires;
    }
  }
  
  return '/img/gear_only.svg';
}

// Get patents for a specific category
function getCategoryPatents(categoryId) {
  let patents = props.patentsMap[categoryId] || [];
  
  if (props.searchQuery) {
    const query = props.searchQuery.toLowerCase();
    return patents.filter(patent => 
      patent.title.toLowerCase().includes(query) ||
      patent.id.toLowerCase().includes(query) ||
      (patent.abstract && patent.abstract.toLowerCase().includes(query))
    );
  }
  
  return patents;
}

// Get patents for a specific subcategory
function getSubcategoryPatents(categoryId, subcategoryId) {
  if (!props.subcategoriesMap[categoryId] || 
      !props.subcategoriesMap[categoryId][subcategoryId]) {
    return [];
  }
  
  let patents = props.subcategoriesMap[categoryId][subcategoryId].patents || [];
  
  if (props.searchQuery) {
    const query = props.searchQuery.toLowerCase();
    return patents.filter(patent => 
      patent.title.toLowerCase().includes(query) ||
      patent.id.toLowerCase().includes(query) ||
      (patent.abstract && patent.abstract.toLowerCase().includes(query))
    );
  }
  
  return patents;
}

function canScrollLeft(containerId) {
  return scrollState[containerId]?.canScrollLeft || false;
}

function canScrollRight(containerId) {
  return scrollState[containerId]?.canScrollRight || true;
}

function updateScrollButtons(containerId) {
  if (!categoryRefs[containerId]) return;
  
  const container = categoryRefs[containerId];
  const { scrollLeft, scrollWidth, clientWidth } = container;
  
  if (!scrollState[containerId]) {
    scrollState[containerId] = { canScrollLeft: false, canScrollRight: true };
  }
  
  scrollState[containerId].canScrollLeft = scrollLeft > 0;
  scrollState[containerId].canScrollRight = scrollLeft < scrollWidth - clientWidth - 10;
}

function scrollLeft(containerId) {
  const container = categoryRefs[containerId];
  if (!container) return;
  
  const scrollAmount = Math.min(container.clientWidth * 0.8, 300);
  container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  
  // Update scroll buttons after animation
  setTimeout(() => updateScrollButtons(containerId), 500);
}

function scrollRight(containerId) {
  const container = categoryRefs[containerId];
  if (!container) return;
  
  const scrollAmount = Math.min(container.clientWidth * 0.8, 300);
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  
  // Update scroll buttons after animation
  setTimeout(() => updateScrollButtons(containerId), 500);
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scroll-smooth {
  scroll-behavior: smooth;
}

/* Ensure images fit properly */
.object-contain {
  object-fit: contain;
}

/* Custom 2-line truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Patent default image styling using gear_only.svg with correct viewBox and centering it */
.patent-default-image {
  background-image: url('/img/gear_only.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 31px 31px; /* Match the viewBox dimensions */
  background-color: #111;
}
</style>