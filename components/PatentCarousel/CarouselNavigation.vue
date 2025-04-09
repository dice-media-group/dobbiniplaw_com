<template>
  <div>
    <button 
      @click="$emit('prev')" 
      class="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-dobbin-dark-green hover:bg-dobbin-green text-white p-3 rounded-full cursor-pointer"
      aria-label="Previous slide"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    
    <button 
      @click="$emit('next')" 
      class="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-dobbin-dark-green hover:bg-dobbin-green text-white p-3 rounded-full cursor-pointer"
      aria-label="Next slide"
      type="button"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['prev', 'next']);
</script>