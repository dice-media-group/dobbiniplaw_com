<template>
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
              :value="searchQuery"
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
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  },
  selectedCategoryId: {
    type: String,
    default: null
  },
  selectionType: {
    type: String,
    default: null
  },
  categoryDisplayName: {
    type: String,
    default: ''
  },
  showCategoriesDialog: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  'update:searchQuery', 
  'select-category',
  'close-category',
  'toggle-categories-dialog'
]);

const headerContainer = ref(null);
const searchHeader = ref(null);

function handleSearchInput(e) {
  emit('update:searchQuery', e.target.value);
}

function selectCategory(categoryId, type = 'direct', displayName = '') {
  emit('select-category', { categoryId, type, displayName });
}

function closeCategory() {
  emit('close-category');
}

function toggleCategoriesDialog() {
  emit('toggle-categories-dialog');
}
</script>

<style scoped>
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

/* Make sure the search input is properly accessible and does not have any issues */
input[type="text"] {
  z-index: 1;
  position: relative;
  -webkit-appearance: none;
  appearance: none;
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
</style>