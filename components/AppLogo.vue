<template>
  <div class="flex justify-center items-center flex-col md:flex-row">
    <div class="logo-container mx-auto">
      <img 
        src="/img/SideBySide.jpg" 
        alt="Dobbin IP Law Logo" 
        class="logo-image max-h-32 w-auto object-contain mx-auto" 
        @error="logoError = true"
        :class="{ 'hidden': logoError }"
      />
      <svg 
        class="h-32 w-32 mx-auto"
        :class="{ 'hidden': !logoError }"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Gear shape -->
        <path d="M50,15c-19.33,0-35,15.67-35,35s15.67,35,35,35s35-15.67,35-35S69.33,15,50,15z M77.38,58.37c-0.46,1.87-1.13,3.65-1.96,5.33l6.37,8.97l-8.57,8.57l-8.97-6.37c-1.68,0.84-3.46,1.5-5.33,1.96L55.7,85h-12.1l-3.23-8.17c-1.87-0.46-3.65-1.13-5.33-1.96l-8.97,6.37l-8.57-8.57l6.37-8.97c-0.84-1.68-1.5-3.46-1.96-5.33L13.74,55.7v-12.1l8.17-3.23c0.46-1.87,1.13-3.65,1.96-5.33l-6.37-8.97l8.57-8.57l8.97,6.37c1.68-0.84,3.46-1.5,5.33-1.96L43.6,13h12.1l3.23,8.17c1.87,0.46,3.65,1.13,5.33,1.96l8.97-6.37l8.57,8.57l-6.37,8.97c0.84,1.68,1.5,3.46,1.96,5.33l8.17,3.23v12.1L77.38,58.37z" fill="#12352c"/>
        <!-- Green swoosh -->
        <path d="M55,30c-8.28,0-15,6.72-15,15c0,8.28,6.72,15,15,15c8.28,0,15-6.72,15-15C70,36.72,63.28,30,55,30z" fill="#009245"/>
      </svg>
    </div>
    
    <!-- Logo text -->
    <span 
      class="text-3xl md:text-5xl text-dobbin-dark-green tracking-wider font-crimson text-center md:text-left mt-2 md:mt-0"
      :class="{ 'hidden': !logoError }"
    >
      DOBBIN IP LAW
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const logoError = ref(false);
</script>

<style scoped>
/* Responsive logo styling */
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
}

.logo-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  aspect-ratio: auto;
  display: block;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .logo-image {
    max-height: 6rem; /* Smaller on mobile */
  }
}

/* Optional smooth transition for hover effects */
img, svg {
  transition: transform 0.3s ease;
}

img:hover, svg:hover {
  transform: scale(1.03);
}
</style>