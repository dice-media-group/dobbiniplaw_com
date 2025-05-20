<template>
  <section class="bg-dobbin-dark-green py-16 px-4">
    <div class="container mx-auto max-w-6xl">
      <div class="bg-opacity-90 p-8 rounded-lg">
        <!-- Question-based engagement headline -->
        <h1 class="text-3xl md:text-4xl font-bold text-white font-crimson mb-6 text-center">
          "Is your innovation properly protected?"
        </h1>
        
        <!-- Value differentiation statement -->
        <h2 class="text-2xl md:text-3xl font-bold text-center mb-8 text-white font-crimson">
          PATENT LAW DOESN'T HAVE TO BE COMPLICATED
        </h2>
        
        <!-- Solution-focused messaging -->
        <p class="text-lg text-white text-center font-crimson mb-10 max-w-4xl mx-auto">
          We help inventors and businesses navigate the complex world of intellectual property 
          with clear, strategic guidance. From patents to trademarks, we make protecting your 
          ideas straightforward.
        </p>
        
        <!-- Dual conversion paths -->
        <div class="flex flex-col md:flex-row justify-center gap-6 mb-8">
          <a :href="consultationLink" 
             class="bg-white text-dobbin-dark-green font-bold py-3 px-8 rounded-lg text-center transition 
                    hover:bg-gray-100 transform hover:scale-105 shadow-lg text-lg">
            SCHEDULE CONSULTATION
          </a>
          <button @click="$emit('openVideo')" 
             class="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg flex items-center 
                    justify-center gap-2 transition hover:bg-white hover:bg-opacity-10 transform hover:scale-105 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            WATCH: TIPS FOR CHOOSING A PATENT ATTORNEY
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  consultationLink: {
    type: String,
    default: "#scheduleForm"
  }
});

defineEmits(['openVideo']);
</script>

<style scoped>
/* Shadow effects */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Animation for hover effects */
a, button {
  transition: all 0.3s ease;
}
</style>