<template>
  <div>
    <div class="mt-4 space-x-2" v-if="show">
      <button 
        v-for="(action, label) in actions" 
        :key="label"
        @click="action.handler"
        :class="action.class"
      >
        {{ label }}
      </button>
      <button 
        @click="$emit('update:show', false)"
        class="text-xs bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
      >
        Hide Debug
      </button>
    </div>
    <button 
      v-else 
      @click="$emit('update:show', true)"
      class="mt-4 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
    >
      Debug
    </button>
    
    <!-- Debug Output -->
    <div v-if="messages.length > 0 && show" class="fixed bottom-0 right-0 bg-black/80 text-white p-4 m-4 rounded text-xs z-50 max-w-md max-h-60 overflow-auto">
      <h4 class="font-bold mb-1">Debug Output:</h4>
      <div v-for="(msg, idx) in messages" :key="idx" class="mb-1">
        {{ msg }}
      </div>
      <button @click="clearMessages" class="absolute top-1 right-1 text-white">Clear</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  messages: Array
});

defineEmits(['update:show', 'clear-messages']);

const actions = {
  'Refresh Content': {
    handler: () => emit('refresh-content'),
    class: 'text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded'
  },
  'List Content Files': {
    handler: () => emit('list-files'),
    class: 'text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded'
  },
  'Force Refresh': {
    handler: () => emit('force-refresh'),
    class: 'text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded'
  }
};

const clearMessages = () => {
  emit('clear-messages');
};
</script>