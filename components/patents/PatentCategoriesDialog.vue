<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-40"
  >
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>
    
    <!-- Dialog Content -->
    <div class="relative z-50 min-h-screen w-full bg-gradient-to-b from-black to-dobbin-gray">
      <div class="container mx-auto pt-20 px-6">
        <h2 class="text-2xl text-white mb-6">Categories</h2>
        
        <div class="space-y-6">
          <button 
            v-for="category in categories" 
            :key="category.id" 
            @click="selectCategory(category.id, category.name)"
            class="w-full text-left py-4 border-b border-gray-700 text-xl text-white hover:text-dobbin-bright-green transition-colors cursor-pointer"
          >
            {{ category.name }}
          </button>
        </div>
        
        <!-- Close Button -->
        <button 
          class="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
          @click="$emit('close')"
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
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  categories: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'select-category']);

function selectCategory(categoryId, categoryName) {
  emit('select-category', { categoryId, type: 'dialog', displayName: categoryName });
  emit('close');
}
</script>

<style scoped>
/* Backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
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