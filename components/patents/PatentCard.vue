<template>
  <div 
    class="patent-card relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-105 cursor-pointer" 
    @click="$emit('click', patent)"
  >
    <div class="patent-image h-40 bg-gray-800 relative">
      <img 
        v-if="patent.images && patent.images.length > 0" 
        :src="getImageSrc(patent.images[0])" 
        :alt="getImageAlt(patent.images[0])"
        class="w-full h-full object-contain"
        loading="lazy"
      >
      <div v-else class="w-full h-full flex items-center justify-center">
        <span class="text-gray-400">No image available</span>
      </div>
      
      <!-- Patent Category Badge -->
      <div v-if="showCategoryBadge && patent.category" class="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
        {{ getCategoryName(patent.category) }}
      </div>
    </div>
    <div class="p-3 bg-gray-800">
      <h3 class="text-sm font-medium truncate text-white">{{ patent.title }}</h3>
      <div class="flex justify-between items-center">
        <p class="text-xs text-gray-400">{{ patent.id }}</p>
        <p class="text-xs text-gray-400">{{ formatDate(patent.publicationDate) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  patent: {
    type: Object,
    required: true
  },
  showCategoryBadge: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

// Category mappings
const categoryNames = {
  'firearms': 'Firearms',
  'medical': 'Medical',
  'electronics': 'Electronics',
  'manufacturing': 'Manufacturing',
  'tools': 'Tools',
  'sports': 'Sports',
  'household': 'Household',
  'other': 'Other'
};

function getCategoryName(categoryId) {
  return categoryNames[categoryId] || categoryId;
}

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getImageSrc(imageData) {
  // Handle both old and new image formats
  if (typeof imageData === 'string') {
    return imageData; // Old format: string path
  } else if (imageData && imageData.thumbnail) {
    return imageData.thumbnail; // New format: object with thumbnail property
  }
  return '/images/patents/placeholder.svg';
}

function getImageAlt(imageData) {
  // Handle both old and new image formats
  if (typeof imageData === 'string') {
    return props.patent.title; // Old format: use patent title
  } else if (imageData && imageData.caption) {
    return imageData.caption; // New format: use caption
  }
  return props.patent.title;
}
</script>

<style scoped>
.patent-card:hover {
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

@media (max-width: 640px) {
  .patent-card {
    width: calc(100% - 1rem);
  }
  
  .patent-image {
    height: 160px;
  }
}
</style>