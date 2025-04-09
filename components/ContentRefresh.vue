<template>
  <div class="fixed top-4 right-4 z-50" v-if="showRefresh">
    <button 
      @click="refreshContent" 
      class="bg-dobbin-green hover:bg-dobbin-dark-green text-white px-3 py-2 rounded shadow-md flex items-center"
      :disabled="isRefreshing"
    >
      <svg v-if="isRefreshing" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      {{ isRefreshing ? 'Refreshing...' : 'Refresh Content' }}
    </button>
    
    <div v-if="status" class="mt-2 p-2 bg-white shadow-md rounded-md text-sm">
      <div v-if="status === 'success'" class="text-green-600">
        ✓ Content refreshed successfully
      </div>
      <div v-else-if="status === 'error'" class="text-red-600">
        ✗ Error refreshing content
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  showRefresh: {
    type: Boolean,
    default: true
  }
});

const isRefreshing = ref(false);
const status = ref('');

// Function to refresh the content cache
const refreshContent = async () => {
  if (isRefreshing.value) return;
  
  isRefreshing.value = true;
  status.value = '';
  
  try {
    console.log('Refreshing content cache...');
    
    // Force refresh by calling queryContent with a timestamp to bypass cache
    const timestamp = Date.now();
    await queryContent(`/patents?refresh=${timestamp}`)
      .where({ _extension: 'md' })
      .find();
      
    console.log('Content cache refreshed.');
    status.value = 'success';
    
    // Reload the page after a brief delay
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  } catch (error) {
    console.error('Error refreshing content:', error);
    status.value = 'error';
  } finally {
    isRefreshing.value = false;
  }
};

// Expose methods
defineExpose({
  refreshContent
});
</script>
