import { ref } from 'vue';

export function useDebugLog() {
  const debugOutput = ref([]);

  const logDebug = (message) => {
    debugOutput.value.push(`[${new Date().toLocaleTimeString()}] ${message}`);
    console.log(message);
  };

  return {
    debugOutput,
    logDebug
  };
}