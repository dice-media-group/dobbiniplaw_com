<template>
  <div class="bg-gray-900 text-white min-h-screen">
    <!-- Main Scrollable Content Container -->
    <main>
      <!-- Featured Patent Hero with Search Header -->
      <div v-if="featuredPatent" class="relative">
        <!-- Initially-scrollable Search Header -->
        <header 
          ref="searchHeader" 
          :class="[
            'flex items-center justify-between p-4 bg-black bg-opacity-90 z-20 transition-all duration-300 w-full',
            isHeaderSticky ? 'fixed top-0' : ''
          ]"
        >
          <div class="text-2xl font-bold">Dobbin IP Law</div>
          <div class="flex items-center space-x-4">
            <div class="relative">
              <input 
                type="text" 
                v-model="searchQuery"
                placeholder="Search patents..." 
                class="bg-black bg-opacity-50 px-4 py-2 rounded text-sm w-48 pl-10"
              />
              <span class="absolute left-3 top-2.5 h-4 w-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </span>
            </div>
          </div>
        </header>

        <!-- Hero Image Content -->
        <div class="h-96 bg-gradient-to-b from-transparent to-gray-900">
          <div class="absolute inset-0 overflow-hidden" style="top: 0;">
            <img 
              :src="getFeaturedImageSrc" 
              :alt="featuredPatent.title" 
              class="w-full h-full object-cover opacity-50"
            />
          </div>
          <div class="absolute bottom-0 left-0 p-8 w-full md:w-1/2">
            <h1 class="text-4xl font-bold mb-2">{{ featuredPatent.title }}</h1>
            <p class="text-gray-300 mb-4">Patent {{ featuredPatent.id }} • {{ formatDate(featuredPatent.publicationDate) }}</p>
            <div class="flex space-x-4">
              <button 
                class="bg-white text-black px-6 py-2 rounded flex items-center font-medium"
                @click="selectPatent(featuredPatent)"
              >
                <span class="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </span>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-else-if="isLoading" class="h-96 flex items-center justify-center bg-gray-800">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
      
      <!-- No featured patent state -->
      <div v-else class="h-96 flex items-center justify-center bg-gray-800">
        <p class="text-gray-400 text-xl">No featured patent available</p>
      </div>

      <!-- Spacer to account for fixed header when sticky -->
      <div v-if="isHeaderSticky" class="h-16"></div>

      <!-- Categories with Carousels -->
      <div class="px-4 md:px-8 py-4 space-y-12">
        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
        
        <template v-else>
          <div v-for="category in filteredCategories" :key="category.id" class="category-row">
            <h2 class="text-xl font-medium mb-4">{{ category.name }}</h2>
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
                  @click="selectPatent(patent)"
                >
                  <div class="relative h-40" :style="`background-image: url('/img/gear_swoosh.svg'); background-size: contain; background-position: center; background-repeat: no-repeat; background-color: #111;`">
                    <img 
                      :src="getPatentImageSrc(patent)" 
                      :alt="patent.title" 
                      class="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div class="p-3 bg-gray-800">
                    <h3 class="text-sm font-medium truncate">{{ patent.title }}</h3>
                    <p class="text-xs text-gray-400">{{ patent.id }}</p>
                  </div>
                </div>
                
                <div v-if="getCategoryPatents(category.id).length === 0" class="flex-none w-full flex items-center justify-center h-40 bg-gray-800 rounded">
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
        
        <!-- Add padding at the bottom to ensure scrollability -->
        <div class="pb-16"></div>
      </div>
    </main>

    <!-- Mobile-Optimized Patent Detail Modal -->
    <div v-if="selectedPatent" class="fixed inset-0 bg-black z-30 overflow-hidden flex flex-col">
      <!-- Close button - Updated to match theme -->
      <button 
        class="absolute right-4 top-4 z-50 bg-gray-800 hover:bg-dobbin-dark-green rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-colors duration-200"
        @click="closePatentDetail"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Fixed Image Viewer with Hi-Res Image -->
      <div class="w-full bg-black">
        <div class="w-full aspect-square flex items-center justify-center">
          <img 
            :src="getSelectedImageHiRes" 
            :alt="selectedPatent.title"
            class="w-full h-full object-contain"
          />
        </div>
        
        <!-- Thumbnail Carousel -->
        <div class="flex overflow-x-auto scrollbar-hide p-2 bg-gray-900 gap-2">
          <div 
            v-for="(image, index) in selectedPatent.images" 
            :key="index" 
            class="flex-none w-16 h-16 rounded overflow-hidden"
            :class="{'ring-2 ring-dobbin-bright-green': selectedImageIndex === index}"
            @click="selectImage(index)"
          >
            <img 
              :src="getImageThumbnail(image)" 
              :alt="`Drawing ${index+1}`"
              class="w-full h-full object-cover"
            />
          </div>
          <div v-if="!selectedPatent.images || selectedPatent.images.length === 0" class="flex-none w-16 h-16 bg-gray-800 flex items-center justify-center rounded">
            <span class="text-xs text-gray-400">No images</span>
          </div>
        </div>
      </div>
      
      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto bg-gray-900">
        <!-- Logo with Swoosh -->
        <div class="flex items-center justify-center py-4 border-b border-gray-800">
          <img src="/img/gear_swoosh.svg" alt="Dobbin IP Law" class="h-24 w-24 bg-white bg-opacity-50 rounded-full p-2" />
        </div>
        
        <!-- Patent Details with Improved Title Visibility -->
        <div class="p-4">
          <!-- Title and Year - Enhanced Size and Contrast -->
          <h2 class="text-2xl md:text-3xl font-bold mb-2 text-white leading-tight">{{ selectedPatent.title }}</h2>
          <p class="text-lg text-gray-300 mb-4">{{ getPatentYear(selectedPatent.publicationDate) }}</p>
          
          <!-- Play Button style Google Patents Link -->
          <a 
            :href="`https://patents.google.com/patent/${selectedPatent.id.replace(/-/g, '')}`"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white py-3 px-6 rounded-md flex items-center justify-center mb-6 font-bold text-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 mr-2">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
            View on Google Patents
          </a>
          
          <!-- Abstract -->
          <div class="mb-6">
            <h3 class="text-xl font-medium mb-2">Abstract</h3>
            <p class="text-base text-gray-300">
              {{ selectedPatent.abstract || 'This patent describes a novel approach to technology in its field. The invention provides significant improvements in efficiency and usability compared to prior art solutions.' }}
            </p>
          </div>
          
          <!-- Inventor and Assignee Bullets with Enhanced Visibility -->
          <div class="space-y-3 mb-6"> <!-- Increased spacing -->
            <div class="flex items-start">
              <span class="text-dobbin-bright-green text-lg mr-2">•</span> <!-- Larger bullet -->
              <div>
                <span class="font-medium">Inventor:</span>
                <span class="text-gray-300 ml-2">{{ selectedPatent.inventors?.join(', ') || 'Not specified' }}</span>
              </div>
            </div>
            <div class="flex items-start">
              <span class="text-dobbin-bright-green text-lg mr-2">•</span>
              <div>
                <span class="font-medium">Assignee:</span>
                <span class="text-gray-300 ml-2">{{ selectedPatent.assignee || 'Not specified' }}</span>
              </div>
            </div>
            <div class="flex items-start">
              <span class="text-dobbin-bright-green text-lg mr-2">•</span>
              <div>
                <span class="font-medium">Patent ID:</span>
                <span class="text-gray-300 ml-2">{{ selectedPatent.id }}</span>
              </div>
            </div>
            <div class="flex items-start">
              <span class="text-dobbin-bright-green text-lg mr-2">•</span>
              <div>
                <span class="font-medium">Publication Date:</span>
                <span class="text-gray-300 ml-2">{{ formatDate(selectedPatent.publicationDate) }}</span>
              </div>
            </div>
          </div>
          
          <!-- Additional patent information can be added here -->
          <div class="pb-8"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useHead } from '#app';

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
const selectedPatent = ref(null);
const selectedImageIndex = ref(0);
const isLoading = ref(true);
const searchQuery = ref('');
const categoryRefs = reactive({});
const scrollState = reactive({});
const searchHeader = ref(null);
const isHeaderSticky = ref(false);
const headerHeight = ref(0);
const headerTop = ref(0);

// Handle scroll events for header stickiness
function handleScroll() {
  if (!searchHeader.value) return;
  
  // Initialize header dimensions if not already set
  if (headerHeight.value === 0) {
    headerHeight.value = searchHeader.value.offsetHeight;
    headerTop.value = searchHeader.value.getBoundingClientRect().top + window.pageYOffset;
  }
  
  const scrollY = window.scrollY;
  
  // Check if we've scrolled past the header's original position
  if (scrollY > headerTop.value) {
    isHeaderSticky.value = true;
  } else {
    isHeaderSticky.value = false;
  }
}

// Computed properties
const filteredCategories = computed(() => {
  if (!searchQuery.value) {
    return categories.value;
  }
  
  // Filter categories based on search query
  return categories.value.filter(category => {
    const patents = getCategoryPatents(category.id);
    return patents.length > 0;
  });
});

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

const getFeaturedImageSrc = computed(() => {
  if (!featuredPatent.value || !featuredPatent.value.images || featuredPatent.value.images.length === 0) {
    return '/api/placeholder/800/400';
  }
  
  const image = featuredPatent.value.images[0];
  
  // Handle both old and new image formats
  if (typeof image === 'string') {
    return image;
  } else if (image.hires) {
    return image.hires;
  } else if (image.thumbnail) {
    return image.thumbnail;
  }
  
  return '/api/placeholder/800/400';
});

const getSelectedImageHiRes = computed(() => {
  if (!selectedPatent.value?.images?.length) {
    return '/api/placeholder/600/600';
  }
  
  const image = selectedPatent.value.images[selectedImageIndex.value];
  
  // Handle both old and new image formats
  if (typeof image === 'string') {
    return image;
  } else if (image.hires) {
    return image.hires;
  } else if (image.thumbnail) {
    return image.thumbnail;
  }
  
  return '/api/placeholder/600/600';
});

// Methods
function getPatentImageSrc(patent) {
  if (!patent.images || patent.images.length === 0) {
    return '/api/placeholder/300/170';
  }
  
  const image = patent.images[0];
  
  // Handle both old and new image formats
  if (typeof image === 'string') {
    return image;
  } else if (image.thumbnail) {
    return image.thumbnail;
  } else if (image.hires) {
    return image.hires;
  }
  
  return '/api/placeholder/300/170';
}

function getImageThumbnail(image) {
  // Handle both old and new image formats
  if (typeof image === 'string') {
    return image;
  } else if (image && image.thumbnail) {
    return image.thumbnail;
  }
  return '/api/placeholder/100/100';
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getPatentYear(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.getFullYear().toString();
}

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

function selectPatent(patent) {
  selectedPatent.value = patent;
  selectedImageIndex.value = 0;
  
  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';
  
  // Reset scroll position of the modal content
  nextTick(() => {
    const modalContent = document.querySelector('.overflow-y-auto');
    if (modalContent) {
      modalContent.scrollTop = 0;
    }
  });
}

function closePatentDetail() {
  selectedPatent.value = null;
  
  // Re-enable body scrolling
  document.body.style.overflow = '';
}

function selectImage(index) {
  selectedImageIndex.value = index;
}

function canScrollLeft(categoryId) {
  return scrollState[categoryId]?.canScrollLeft || false;
}

function canScrollRight(categoryId) {
  return scrollState[categoryId]?.canScrollRight || true;
}

function updateScrollButtons(categoryId) {
  if (!categoryRefs[categoryId]) return;
  
  const container = categoryRefs[categoryId];
  const { scrollLeft, scrollWidth, clientWidth } = container;
  
  if (!scrollState[categoryId]) {
    scrollState[categoryId] = { canScrollLeft: false, canScrollRight: true };
  }
  
  scrollState[categoryId].canScrollLeft = scrollLeft > 0;
  scrollState[categoryId].canScrollRight = scrollLeft < scrollWidth - clientWidth - 10;
}

function scrollLeft(categoryId) {
  const container = categoryRefs[categoryId];
  if (!container) return;
  
  const scrollAmount = Math.min(container.clientWidth * 0.8, 300);
  container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  
  // Update scroll buttons after animation
  setTimeout(() => updateScrollButtons(categoryId), 500);
}

function scrollRight(categoryId) {
  const container = categoryRefs[categoryId];
  if (!container) return;
  
  const scrollAmount = Math.min(container.clientWidth * 0.8, 300);
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  
  // Update scroll buttons after animation
  setTimeout(() => updateScrollButtons(categoryId), 500);
}

// Data loading function
async function loadPatentData() {
  try {
    isLoading.value = true;
    
    // Fetch categories
    const categoriesModule = await import('~/content/patents/categories.json');
    categories.value = categoriesModule.default.categories.sort((a, b) => a.order - b.order);
    
    // Fetch patents for each category
    const loadPromises = categories.value.map(async (category) => {
      try {
        // Try to import the category-specific JSON file
        const module = await import(`~/content/patents/${category.id}.json`);
        patentsMap.value[category.id] = module.default.patents || [];
        
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
        const allPatentsModule = await import('~/content/patents/all-patents.json');
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
    
    // Initialize scroll state for all categories
    for (const category of categories.value) {
      if (!scrollState[category.id]) {
        scrollState[category.id] = { canScrollLeft: false, canScrollRight: true };
      }
      
      // Update scroll buttons on next tick when DOM is ready
      setTimeout(() => updateScrollButtons(category.id), 100);
    }
    
    // Initialize header position after patents are loaded
    nextTick(() => {
      if (searchHeader.value) {
        headerHeight.value = searchHeader.value.offsetHeight;
        headerTop.value = searchHeader.value.getBoundingClientRect().top + window.pageYOffset;
        
        // Force scroll handler to run once to initialize states
        handleScroll();
      }
    });
  }
}

// Lifecycle hooks
onMounted(() => {
  loadPatentData();
  window.addEventListener('scroll', handleScroll);
  
  // Also handle resize events to recalculate header position
  window.addEventListener('resize', () => {
    // Reset dimensions so they'll be recalculated
    headerHeight.value = 0;
    headerTop.value = 0;
    nextTick(() => handleScroll());
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleScroll);
  // Ensure body scrolling is enabled when component is unmounted
  document.body.style.overflow = '';
});
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

/* Transitions for header */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>