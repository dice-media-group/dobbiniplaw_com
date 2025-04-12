<template>
  <div class="absolute top-2 left-2 bg-white/90 p-2 text-xs rounded shadow-md z-50 max-w-md max-h-60 overflow-auto">
    <h4 class="font-bold mb-1">Patent Content Debug</h4>
    <p>Total patents: {{ patents.length }}</p>
    <p>Current index: {{ currentIndex }}</p>
    <p>Data source: {{ fromMarkdown ? 'Markdown' : 'Fallback' }}</p>
    <div>
      <p class="font-semibold mt-2">Patents loaded:</p>
      <ul class="list-disc pl-4 text-xs">
        <li v-for="(patent, idx) in patents" :key="idx">
          {{ patent ? patent.title : 'undefined patent' }} 
          {{ patent && patent._path ? `(${patent._path})` : '(fallback)' }}
        </li>
      </ul>
    </div>
    <div v-if="queryError">
      <p class="font-semibold mt-2 text-red-600">Query Error:</p>
      <p>{{ queryError }}</p>
    </div>
    <button @click="$emit('close')" class="absolute top-1 right-1 text-gray-500 hover:text-gray-800">×</button>
  </div>
</template>

<script setup>
const props = defineProps({
  patents: {
    type: Array,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  },
  fromMarkdown: {
    type: Boolean,
    default: false
  },
  queryError: {
    type: [String, null],
    default: null
  }
});

// Emit close event to parent
defineEmits(['close']);
</script>