<template>
  <div class="patent-carousel relative mb-12">
    <h2 class="text-xl font-medium mb-4 text-white">{{ category.name }}</h2>
    
    <div class="relative">
      <button 
        v-if="canScrollLeft"
        class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-full z-10"
        @click="scrollLeft"
        aria-label="Scroll left"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div 
        ref="scrollContainer"
        class="flex space-x-4 overflow-x-auto no-scrollbar pb-4"
        @scroll="updateScrollButtons"
      >
        <patent-card 
          v-for="patent in patents" 
          :key="patent.id"
          :patent="patent"
          class="flex-none w-72"
          @click="$emit('patent-selected', patent)"
        />
      </div>
      
      <button 
        v-if="canScrollRight"
        class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-1 rounded-full z-10"
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
  scrollContainer.value.scrollBy({ left: -300, behavior: 'smooth' });
}

function scrollRight() {
  if (!scrollContainer.value) return;
  scrollContainer.value.scrollBy({ left: 300, behavior: 'smooth' });
}

onMounted(() => {
  updateScrollButtons();
  window.addEventListener('resize', updateScrollButtons);
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
</style>