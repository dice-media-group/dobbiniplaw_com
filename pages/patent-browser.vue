<template>
  <div class="bg-dobbin-gray text-white min-h-screen">
    <!-- Main Scrollable Content Container -->
    <main>
      <!-- Fixed Header Container - Always present -->
      <div 
        ref="headerContainer"
        class="sticky top-0 z-30 w-full"
      >
        <!-- Header Content -->
        <header 
          ref="searchHeader" 
          class="flex flex-col bg-black bg-opacity-90 w-full transition-all duration-200"
        >
          <!-- Top row with logo and search -->
          <div class="flex items-center justify-between p-4">
            <div class="text-2xl font-bold">Dobbin IP Law</div>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input 
                  type="text" 
                  v-model="searchQuery"
                  placeholder="Search patents..." 
                  class="bg-black bg-opacity-50 px-4 py-2 rounded text-sm w-48 pl-10"
                  @input="handleSearchInput"
                />
                <span class="absolute left-3 top-2.5 h-4 w-4 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          
          <!-- Bottom row with category buttons - ANIMATED VERSION -->
          <div class="flex px-4 pb-8 space-x-2 md:space-x-4 overflow-x-auto relative h-16">
            <!-- Initial buttons (shown when no category is selected) - Left aligned -->
            <transition name="slide-default" mode="out-in">
              <div v-if="!selectedCategoryId" class="absolute inset-0 flex justify-start space-x-2 md:space-x-4 pl-4">
                <!-- Firearms button -->
                <button 
                  type="button"
                  class="px-6 py-1 h-10 rounded-full border transition-colors whitespace-nowrap text-xs cursor-pointer select-none bg-transparent text-white border-gray-600 hover:bg-gray-800 flex items-center"
                  @click="selectCategory('firearms', 'direct', 'Firearms')"
                >
                  Firearms
                </button>
                
                <!-- Electronics button -->
                <button 
                  type="button"
                  class="px-6 py-1 h-10 rounded-full border transition-colors whitespace-nowrap text-xs cursor-pointer select-none bg-transparent text-white border-gray-600 hover:bg-gray-800 flex items-center"
                  @click="selectCategory('electronics', 'direct', 'Electronics')"
                >
                  Electronics
                </button>
                
                <!-- Categories button -->
                <button 
                  type="button"
                  class="px-6 py-1 h-10 rounded-full border border-gray-600 transition-colors bg-transparent text-white hover:bg-gray-800 flex items-center whitespace-nowrap text-xs cursor-pointer select-none"
                  @click="toggleCategoriesDialog"
                >
                  Categories
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="h-3 w-3 ml-1"
                    :class="{ 'transform rotate-180': showCategoriesDialog }"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            </transition>
            
            <!-- Selected category buttons - Left aligned (combined direct and dialog) -->
            <transition name="slide-category" mode="out-in">
              <div v-if="selectedCategoryId" :key="selectedCategoryId" class="absolute inset-0 flex justify-start space-x-2 md:space-x-4 pl-4">
                <!-- Close/X button -->
                <button 
                  type="button"
                  class="w-10 h-10 rounded-full border border-gray-600 transition-colors bg-transparent text-white hover:bg-gray-800 flex items-center justify-center text-xs cursor-pointer select-none"
                  @click="closeCategory"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
                
                <!-- Selected category button (green but with white text) -->
                <button 
                  type="button"
                  class="px-6 py-1 h-10 rounded-full border transition-colors whitespace-nowrap text-xs cursor-pointer select-none bg-dobbin-bright-green text-white border-dobbin-bright-green flex items-center"
                  v-if="selectionType === 'direct'"
                >
                  {{ categoryDisplayName }}
                </button>
                
                <!-- Selected category button with dropdown (green but with white text) -->
                <button 
                  type="button"
                  class="px-6 py-1 h-10 rounded-full border transition-colors whitespace-nowrap text-xs cursor-pointer select-none bg-dobbin-bright-green text-white border-dobbin-bright-green flex items-center"
                  @click="toggleCategoriesDialog"
                  v-if="selectionType === 'dialog'"
                >
                  {{ categoryDisplayName }}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="h-3 w-3 ml-1"
                    :class="{ 'transform rotate-180': showCategoriesDialog }"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                
                <!-- All Categories button - Only shown for direct selections -->
                <button 
                  v-if="selectionType === 'direct'"
                  type="button"
                  class="px-6 py-1 h-10 rounded-full border border-gray-600 transition-colors bg-transparent text-white hover:bg-gray-800 flex items-center whitespace-nowrap text-xs cursor-pointer select-none"
                  @click="toggleCategoriesDialog"
                >
                  All Categories
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    class="h-3 w-3 ml-1"
                    :class="{ 'transform rotate-180': showCategoriesDialog }"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            </transition>
          </div>
        </header>
      </div>

      <!-- Featured Patent Hero -->
      <div v-if="featuredPatent" class="relative">
        <div class="h-96 bg-gradient-to-b from-transparent to-dobbin-gray">
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
                class="bg-white text-black px-6 py-1 h-10 rounded flex items-center font-medium"
                @click="selectPatent(featuredPatent)"
              >
                <span class="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
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
      <div v-else-if="isLoading" class="h-96 flex items-center justify-center bg-dobbin-gray">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
      
      <!-- No featured patent state -->
      <div v-else class="h-96 flex items-center justify-center bg-dobbin-gray">
        <p class="text-gray-400 text-xl">No featured patent available</p>
      </div>

      <!-- Categories with Carousels -->
      <div class="px-4 md:px-8 py-4 space-y-12 text-white">
        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
        
        <template v-else>
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
                  @click="selectPatent(patent)"
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
        
        <!-- Add padding at the bottom to ensure scrollability -->
        <div class="pb-16"></div>
      </div>
    </main>

    <!-- Categories Dialog -->
    <div 
      v-if="showCategoriesDialog" 
      class="fixed inset-0 z-40"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
        @click="showCategoriesDialog = false"
      ></div>
      
      <!-- Dialog Content -->
      <div class="relative z-50 min-h-screen w-full bg-gradient-to-b from-black to-dobbin-gray">
        <div class="container mx-auto pt-20 px-6">
          <h2 class="text-2xl text-white mb-6">Categories</h2>
          
          <div class="space-y-6">
            <button 
              v-for="category in categories" 
              :key="category.id" 
              @click="selectCategory(category.id, 'dialog', category.name)"
              class="w-full text-left py-4 border-b border-gray-700 text-xl text-white hover:text-dobbin-bright-green transition-colors cursor-pointer"
            >
              {{ category.name }}
            </button>
          </div>
          
          <!-- Close Button -->
          <button 
            class="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
            @click="showCategoriesDialog = false"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Netflix-Style Patent Detail Modal -->
    <div v-if="selectedPatent" class="fixed inset-0 z-30">
      <!-- Darkened/blurred backdrop -->
      <div class="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm"></div>

      <!-- Netflix-style dialog container -->
      <div class="fixed inset-0 sm:inset-6 flex items-center justify-center">
        <!-- Modal content container -->
        <div class="w-full h-full sm:h-[90vh] max-w-6xl mx-auto bg-gray-900 overflow-hidden flex flex-col sm:rounded-lg shadow-2xl patent-modal-container">
          <!-- Close button - Positioned at top-right corner of the dialog -->
          <button 
            class="absolute right-3 top-3 z-50 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200"
            @click="closePatentDetail"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
            
          <!-- Main patent image header section with auto-sizing container -->
          <div class="w-full bg-black patent-image-section">
            <!-- Auto-sizing container for image display -->
            <div class="patent-image-container">
              <div v-if="hasRealImage(selectedPatent)" class="flex items-center justify-center">
                <img 
                  :src="getFullSizeImage" 
                  :alt="selectedPatent.title"
                  class="patent-full-image"
                />
              </div>
              <div v-else class="w-full h-64 patent-default-image">
                <!-- Background styles will show the SVG -->
              </div>
            </div>
            
            <!-- Thumbnail Carousel -->
            <div class="flex overflow-x-auto scrollbar-hide p-3 bg-gray-800 gap-3">
              <!-- For each image in the patent -->
              <div 
                v-for="(image, index) in selectedPatent.images" 
                :key="index" 
                class="flex-none w-24 h-24 rounded overflow-hidden"
                :class="{'ring-2 ring-dobbin-bright-green': selectedImageIndex === index}"
                @click="selectImage(index)"
              >
                <!-- Display the image if it's a real image -->
                <div v-if="isRealImage(image)" class="w-full h-full bg-black">
                  <img 
                    :src="getImageThumbnail(image)" 
                    :alt="`Drawing ${index+1}`"
                    class="w-full h-full object-contain"
                  />
                </div>
                <!-- Otherwise display the gear SVG -->
                <div v-else class="w-full h-full patent-default-image-thumbnail"></div>
              </div>

              <!-- When no images are available -->
              <div v-if="!selectedPatent.images || selectedPatent.images.length === 0" class="flex-none w-24 h-24 bg-gray-700 flex items-center justify-center rounded patent-default-image-thumbnail">
                <!-- Background styles will show the SVG -->
              </div>
            </div>
          </div>
          
          <!-- Scrollable Content Section -->
          <div class="flex-1 overflow-y-auto patent-details-scroll">
            <!-- Logo Section - Enhanced for responsiveness and proper centering -->
            <div class="bg-white py-4 sm:py-6" data-v-a54da7ff=""><div class="container mx-auto px-4 flex justify-center items-center" data-v-a54da7ff=""><a href="/" class="logo-link flex justify-center items-center" data-v-a54da7ff=""><!-- Using the AppLogo component --><div class="flex justify-center items-center flex-col md:flex-row" data-v-a54da7ff="" data-v-a3b5a2eb=""><div class="logo-container mx-auto" data-v-a3b5a2eb=""><img src="/img/SideBySide.jpg" alt="Dobbin IP Law Logo" class="logo-image max-h-32 w-auto object-contain mx-auto" data-v-a3b5a2eb=""><svg class="hidden h-32 w-32 mx-auto" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" data-v-a3b5a2eb=""><!-- Gear shape --><path d="M50,15c-19.33,0-35,15.67-35,35s15.67,35,35,35s35-15.67,35-35S69.33,15,50,15z M77.38,58.37c-0.46,1.87-1.13,3.65-1.96,5.33l6.37,8.97l-8.57,8.57l-8.97-6.37c-1.68,0.84-3.46,1.5-5.33,1.96L55.7,85h-12.1l-3.23-8.17c-1.87-0.46-3.65-1.13-5.33-1.96l-8.97,6.37l-8.57-8.57l6.37-8.97c-0.84-1.68-1.5-3.46-1.96-5.33L13.74,55.7v-12.1l8.17-3.23c0.46-1.87,1.13-3.65,1.96-5.33l-6.37-8.97l8.57-8.57l8.97,6.37c1.68-0.84,3.46-1.5,5.33-1.96L43.6,13h12.1l3.23,8.17c1.87,0.46,3.65,1.13,5.33,1.96l8.97-6.37l8.57,8.57l-6.37,8.97c0.84,1.68,1.5,3.46,1.96,5.33l8.17,3.23v12.1L77.38,58.37z" fill="#12352c" data-v-a3b5a2eb=""></path><!-- Green swoosh --><path d="M55,30c-8.28,0-15,6.72-15,15c0,8.28,6.72,15,15,15c8.28,0,15-6.72,15-15C70,36.72,63.28,30,55,30z" fill="#009245" data-v-a3b5a2eb=""></path></svg></div><!-- Logo text --><h1 class="hidden text-3xl md:text-5xl text-dobbin-dark-green tracking-wider font-crimson text-center md:text-left mt-2 md:mt-0" data-v-a3b5a2eb=""> DOBBIN IP LAW </h1></div></a></div></div>
            
            <!-- Patent Details -->
            <div class="p-4 sm:p-6 bg-gray-900 text-white">
              <!-- Title and Year (Removed line-clamp-2 from here to show full title) -->
              <h2 class="text-2xl md:text-3xl font-bold mb-2 leading-tight text-gray-300">{{ selectedPatent.title }}</h2>
              <p class="text-lg text-gray-300 mb-4">{{ getPatentYear(selectedPatent.publicationDate) }}</p>
              
              <!-- Google Patents Link Button -->
              <a 
                :href="`https://patents.google.com/patent/${selectedPatent.id.replace(/-/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full mb-6 bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white py-3 px-4 rounded-md flex items-center justify-center font-bold text-base transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 mr-2">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                View on Google Patents
              </a>
              
              <!-- Abstract Section -->
              <div class="mb-6">
                <h3 class="text-xl font-medium mb-2 text-gray-300">Abstract</h3>
                <p class="text-base text-gray-300">
                  {{ selectedPatent.abstract || 'This patent describes a novel approach to technology in its field. The invention provides significant improvements in efficiency and usability compared to prior art solutions.' }}
                </p>
              </div>
              
              <!-- Details Section -->
              <div class="space-y-3 mb-6"> 
                <div class="flex items-start">
                  <span class="text-dobbin-bright-green text-lg mr-2">•</span>
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
              
              <!-- Bottom padding for scrolling -->
              <div class="pb-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
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
const headerContainer = ref(null);
const isHeaderSticky = ref(true); // Always true with new implementation

// Category UI state variables
const selectedCategoryId = ref(null);
const selectionType = ref(null); // 'direct' or 'dialog'
const categoryDisplayName = ref(''); // Store the display name separately
const showCategoriesDialog = ref(false);

// Add a watcher for selectedCategoryId changes
watch(selectedCategoryId, (newVal) => {
  console.log('selectedCategoryId changed:', newVal);
});

// Handle search input
function handleSearchInput(e) {
  // Make sure the search input is working properly 
  // and doesn't get prevented by .stop.prevent modifiers
  console.log('Search input:', searchQuery.value);
}

// Select a category with selection type and display name
function selectCategory(categoryId, type = 'direct', displayName = '') {
  console.log('selectCategory called with:', categoryId, type, displayName);
  
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
function closeCategory() {
  selectedCategoryId.value = null;
  selectionType.value = null;
  categoryDisplayName.value = '';
}

// Toggle categories dialog
function toggleCategoriesDialog() {
  showCategoriesDialog.value = !showCategoriesDialog.value;
}

// Computed property for displayed categories based on filters
const displayedCategories = computed(() => {
  let filtered = categories.value;
  
  // Filter by selected category if any
  if (selectedCategoryId.value) {
    filtered = filtered.filter(category => category.id === selectedCategoryId.value);
  }
  
  // Filter by search query if any
  if (searchQuery.value) {
    return filtered.filter(category => {
      const patents = getCategoryPatents(category.id);
      return patents.length > 0;
    });
  }
  
  return filtered;
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
  if (hasRealImage(featuredPatent.value)) {
    const image = featuredPatent.value.images[0];
    
    // Handle both old and new image formats
    if (typeof image === 'string') {
      return image;
    } else if (image.hires) {
      return image.hires;
    } else if (image.thumbnail) {
      return image.thumbnail;
    }
  }
  
  return '/img/gear_only.svg';
});

// New computed property specifically for the full-sized image in the modal
const getFullSizeImage = computed(() => {
  if (hasRealImage(selectedPatent.value) && selectedPatent.value.images[selectedImageIndex.value]) {
    const image = selectedPatent.value.images[selectedImageIndex.value];
    
    // Always prefer high-resolution images
    if (typeof image === 'object' && image.hires) {
      return image.hires;
    } else if (typeof image === 'string') {
      return image;
    } else if (image.thumbnail) {
      return image.thumbnail;
    }
  }
  
  return '/img/gear_only.svg';
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

// Check if an individual image is a real image (not a placeholder)
function isRealImage(image) {
  if (!image) {
    return false;
  }
  
  if (typeof image === 'string' && image.includes('placeholder')) {
    return false;
  } else if (image.thumbnail && image.thumbnail.includes('placeholder')) {
    return false;
  } else if (image.hires && image.hires.includes('placeholder')) {
    return false;
  }
  
  // Check if it's a valid image path
  if (typeof image === 'string' && image.match(/\.(jpeg|jpg|gif|png|svg)$/i)) {
    return true;
  } else if (image.thumbnail && image.thumbnail.match(/\.(jpeg|jpg|gif|png|svg)$/i)) {
    return true;
  } else if (image.hires && image.hires.match(/\.(jpeg|jpg|gif|png|svg)$/i)) {
    return true;
  }
  
  return false;
}

// Methods
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

function getImageThumbnail(image) {
  // Handle both old and new image formats
  if (typeof image === 'string') {
    return image;
  } else if (image && image.thumbnail) {
    return image.thumbnail;
  }
  return '/img/gear_only.svg';
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
    const detailsScroll = document.querySelector('.patent-details-scroll');
    if (detailsScroll) {
      detailsScroll.scrollTop = 0;
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
    
    // No default selected category - set to null
    selectedCategoryId.value = null;
    selectionType.value = null;
    categoryDisplayName.value = '';
    
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
  }
}

// Lifecycle hooks
onMounted(() => {
  loadPatentData();
  
  // Set up scroll handlers for carousels
  window.addEventListener('resize', () => {
    // Handle resize for carousel scroll buttons
    for (const categoryId in categoryRefs) {
      nextTick(() => updateScrollButtons(categoryId));
    }
  });
  
  // Close categories dialog on ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      showCategoriesDialog.value = false;
    }
  });

  // Add focus handler to search input to make sure it works properly
  const searchInput = document.querySelector('input[type="text"]');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      console.log('Search input focused');
    });
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', () => {});
  window.removeEventListener('keydown', () => {});
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

/* Smaller thumbnail version */
.patent-default-image-thumbnail {
  background-image: url('/img/gear_only.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 31px 31px; /* Match the viewBox dimensions */
  background-color: #111;
}

/* Special patent logo class for the modal */
.patent-logo {
  background-image: url('/img/gear_only.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 31px 31px; /* Match the viewBox dimensions */
}

/* Ensure buttons are explicitly clickable, especially on mobile */
.cursor-pointer, button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  user-select: none;
  touch-action: manipulation;
}

/* Add active styling for better mobile feedback */
.cursor-pointer:active, button:active {
  opacity: 0.7;
}

/* Make sure the search input is properly accessible and does not have any issues */
input[type="text"] {
  z-index: 1;
  position: relative;
  -webkit-appearance: none;
  appearance: none;
}

/* Animation styles for default buttons transitions */
.slide-default-enter-active,
.slide-default-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-default-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-default-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Animation styles for category transitions */
.slide-category-enter-active,
.slide-category-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-category-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-category-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

/* Backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

/* Patent Modal Container */
.patent-modal-container {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

/* Patent image section - fixed at top */
.patent-image-section {
  flex-shrink: 0;
}

/* Scrollable details section */
.patent-details-scroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) rgba(0, 0, 0, 0.2);
  overflow-y: auto;
  flex-grow: 1;
}

.patent-details-scroll::-webkit-scrollbar {
  width: 8px;
}

.patent-details-scroll::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

.patent-details-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

/* Patent image container styles for better image display */
.patent-image-container {
  min-height: 250px;
  max-height: 45vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #000;
  padding: 1rem;
}

.patent-full-image {
  max-width: 100%;
  max-height: 40vh;
  object-fit: contain;
  display: block;
}

/* Tablet & Desktop specific styles */
@media (min-width: 800px) {
  .patent-modal-container {
    height: auto;
    max-height: 90vh;
  }
  
  .patent-image-container {
    min-height: 300px;
    max-height: 40vh;
  }
  
  .patent-full-image {
    max-height: 35vh;
  }
  
  .patent-details-scroll {
    max-height: calc(90vh - 450px); /* Adjusted to ensure proper scrolling */
  }
}
</style>