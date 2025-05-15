<template>
  <div 
    class="patent-card relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer" 
    @click="$emit('click', patent)"
  >
    <div class="patent-image h-40 bg-gray-800">
      <img 
        v-if="patent.images && patent.images.length > 0" 
        :src="patent.images[0]" 
        :alt="patent.title"
        class="w-full h-full object-contain"
      >
      <div v-else class="w-full h-full flex items-center justify-center">
        <span class="text-gray-400">No image available</span>
      </div>
    </div>
    <div class="p-3 bg-gray-800">
      <h3 class="text-sm font-medium truncate text-white">{{ patent.title }}</h3>
      <p class="text-xs text-gray-400">{{ patent.id }}</p>
      <p class="text-xs text-gray-400">{{ formatDate(patent.publicationDate) }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  patent: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['click']);

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
</script>

<style scoped>
.patent-card:hover {
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}
</style>