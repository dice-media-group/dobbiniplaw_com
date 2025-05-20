<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" @click="closeModal">
    <div class="relative w-full max-w-4xl mx-auto" @click.stop>
      <!-- Close button -->
      <button 
        @click="closeModal" 
        class="absolute -top-10 right-0 text-white hover:text-gray-300 focus:outline-none"
        aria-label="Close video"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <!-- Video container -->
      <div class="aspect-w-16 aspect-h-9">
        <iframe 
          :src="videoSrc" 
          :title="videoTitle" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen 
          class="w-full h-full"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, defineProps, defineEmits } from 'vue';

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  videoSrc: {
    type: String,
    required: true
  },
  videoTitle: {
    type: String,
    default: 'Video'
  }
});

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}

// Close modal when Escape key is pressed
function handleKeyDown(e) {
  if (e.key === 'Escape' && props.isOpen) {
    closeModal();
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  
  // Prevent body scrolling when modal is open
  if (props.isOpen) {
    document.body.style.overflow = 'hidden';
  }
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  
  // Re-enable body scrolling when component is unmounted
  document.body.style.overflow = '';
});

// Watch for changes to isOpen prop to handle body scroll
watch(() => props.isOpen, (newValue) => {
  document.body.style.overflow = newValue ? 'hidden' : '';
});
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  height: 0;
  overflow: hidden;
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>