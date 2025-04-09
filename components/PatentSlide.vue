<template>
  <div 
    v-show="isActive"
    class="flex flex-col md:flex-row w-full"
  >
    <!-- Slide image -->
    <div class="md:w-1/2 p-10 flex items-center justify-center bg-white border-r border-gray-200">
      <img 
        :src="patent.image" 
        :alt="patent.title" 
        class="max-w-full max-h-80 object-contain patent-image"
      />
    </div>
    
    <!-- Slide content -->
    <div class="md:w-1/2 p-10 bg-white">
      <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green patent-title">{{ patent.title }}</h3>
      <p class="mb-8 text-gray-700 patent-description">{{ patent.description }}</p>
      <a 
        :href="patent.patentNumber ? '#' + patent.patentNumber : '#'"
        class="inline-block bg-dobbin-green hover:bg-dobbin-dark-green text-white font-bold py-2 px-6 patent-button"
      >
        {{ patent.linkText || 'Patent ' + patent.patentNumber }}
      </a>
    </div>
  </div>
</template>

<script setup>
// Props to receive from parent component
const props = defineProps({
  patent: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  },
  slideDirection: {
    type: String,
    default: 'right'
  }
});
</script>

<style scoped>
/* Animation for individual elements */
.patent-image, .patent-title, .patent-description, .patent-button {
  transition: all 0.5s;
  transition-delay: 0.2s;
}

.slide-enter-from .patent-image,
.slide-enter-from .patent-title,
.slide-enter-from .patent-description,
.slide-enter-from .patent-button {
  opacity: 0;
  transform: translateY(20px);
}

.slide-enter-from .patent-title {
  transition-delay: 0.3s;
}

.slide-enter-from .patent-description {
  transition-delay: 0.4s;
}

.slide-enter-from .patent-button {
  transition-delay: 0.5s;
}
</style>