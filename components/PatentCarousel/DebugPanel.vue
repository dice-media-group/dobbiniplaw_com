<template>
  <div>
    <div v-if="show" class="absolute top-2 left-2 bg-white/90 p-2 text-xs rounded shadow-md z-50 max-w-md max-h-60 overflow-auto">
      <h4 class="font-bold mb-1">Patent Content Debug</h4>
      <p>Total patents: {{ patents.length }}</p>
      <p>Current index: {{ currentIndex }}</p>
      <p>Data source: {{ fromMarkdown ? 'Markdown' : 'Fallback' }}</p>
      <div>
        <p class="font-semibold mt-2">Patents loaded:</p>
        <ul class="list-disc pl-4 text-xs">
          <li v-for="(patent, idx) in patents" :key="idx">
            {{ patent.title }} ({{ patent._path || 'fallback' }})
          </li>
        </ul>
      </div>
      <div v-if="queryError">
        <p class="font-semibold mt-2 text-red-600">Query Error:</p>
        <p>{{ queryError }}</p>
      </div>
      <button @click="$emit('update:show', false)" class="absolute top-1 right-1 text-gray-500 hover:text-gray-800">×</button>
    </div>
    
    <button 
      v-else
      @click="$emit('update:show', true)" 
      class="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 p-1 rounded z-50"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  patents: Array,
  currentIndex: Number,
  fromMarkdown: Boolean,
  queryError: String
});

defineEmits(['update:show']);
</script>