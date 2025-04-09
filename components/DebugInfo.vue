<template>
  <div class="fixed bottom-0 right-0 bg-black/80 text-white p-4 m-4 rounded text-xs z-50" v-if="show">
    <h3 class="font-bold mb-2">Content Debug</h3>
    <div>
      <p>Patents loaded: {{ patentCount }}</p>
      <p>Source: {{ source }}</p>
      <p>Current patent: {{ currentPatent }}</p>
    </div>
    <button @click="show = false" class="absolute top-1 right-1 text-white">×</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  patentCount: {
    type: Number,
    default: 0
  },
  source: {
    type: String,
    default: 'Unknown'
  },
  currentPatent: {
    type: String,
    default: 'None'
  }
});

const show = ref(true);
</script>
