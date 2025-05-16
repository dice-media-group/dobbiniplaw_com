<template>
  <div class="patent-carousel relative mb-12">
    <h2 class="text-xl font-medium mb-4 text-white flex items-center">
      <span>{{ category.name }}</span>
      <span v-if="showCounts" class="ml-2 text-sm text-gray-400">({{ patents.length }} patents)</span>
    </h2>
    
    <div class="relative">
      <button 
        v-if="canScrollLeft"
        class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 p-1 rounded-full z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="scrollLeft"
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div 
        ref="scrollContainer"
        class="flex gap-4 overflow-x-auto no-scrollbar pb-4 scroll-smooth"
        @scroll="updateScrollButtons"
      >
        <patent-card 
          v-for="patent in patents" 
          :key="patent.id"
          :patent="patent"
          :showCategoryBadge="showCategoryBadge"
          class="flex-none w-72"
          @click="$emit('patent-selected', patent)"
        />
        
        <!-- Empty state if no patents -->
        <div v-if="patents.length === 0" class="flex-none w-full py-8 flex items-center justify-center">
          <p class="text-gray-400">No patents available in this category</p>
        </div>
      </div>
      
      <button 
        v-if="canScrollRight"
        class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 p-1 rounded-full z-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        @click="scrollRight"
        aria-label="Scroll right"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import PatentCard from './PatentCard.vue';

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  patents: {
    type: Array,
    required: true
  },
  showCounts: {
    type: Boolean,
    default: false
  },
  showCategoryBadge: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['patent-selected']);
const scrollContainer = ref(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

function updateScrollButtons() {
  if (!scrollContainer.value) return;
  
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
  canScrollLeft.value = scrollLeft > 0;
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10;
}

function scrollLeft() {
  if (!scrollContainer.value) return;
  const scrollAmount = Math.min(scrollContainer.value.clientWidth * 0.8, 300);
  scrollContainer.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
}

function scrollRight() {
  if (!scrollContainer.value) return;
  const scrollAmount = Math.min(scrollContainer.value.clientWidth * 0.8, 300);
  scrollContainer.value.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

onMounted(() => {
  updateScrollButtons();
  window.addEventListener('resize', updateScrollButtons);
  
  // Set initial scroll position based on selected item if needed
  if (props.selectedPatentId && scrollContainer.value) {
    const items = scrollContainer.value.querySelectorAll('.patent-card');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.dataset.patentId === props.selectedPatentId) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        break;
      }
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateScrollButtons);
});
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scroll-smooth {
  scroll-behavior: smooth;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .patent-carousel button {
    padding: 0.25rem;
  }
  
  .patent-carousel button svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>