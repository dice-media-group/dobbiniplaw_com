<template>
  <div>
    <!-- Video Modal -->
    <div v-if="isVideoModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" @click="closeVideoModal">
      <div class="relative w-full max-w-4xl mx-auto" @click.stop>
        <!-- Close button -->
        <button 
          @click="closeVideoModal" 
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
            :src="videoModalSrc" 
            title="Patent Attorney Geoff Dobbin Explains IP Law" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            class="w-full h-full"
          ></iframe>
        </div>
      </div>
    </div>

    <!-- Problem-Solution Narrative Hero Banner -->
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
            <a href="#" @click.prevent="scrollToScheduleForm" 
               class="bg-white text-dobbin-dark-green font-bold py-3 px-8 rounded-lg text-center transition 
                      hover:bg-gray-100 transform hover:scale-105 shadow-lg text-lg">
              SCHEDULE CONSULTATION
            </a>
            <button @click="openVideoModal" 
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
    
    <!-- Social Proof - Client Success Story -->
    <section class="py-10 bg-gray-50">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="flex flex-col md:flex-row gap-6 items-center">
          <!-- Mini Video Thumbnail -->
          <div class="md:w-1/3">
            <div class="relative rounded-lg shadow-lg overflow-hidden cursor-pointer" @click="openVideoModal">
              <img 
                src="https://img.youtube.com/vi/ljNiDscQ-Vw/maxresdefault.jpg" 
                alt="Video thumbnail: Tips for Choosing a Patent Attorney" 
                class="w-full h-auto"
              >
              <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-30 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <!-- Testimonial with specific outcome -->
          <div class="md:w-2/3">
            <blockquote class="italic text-gray-700 text-lg font-crimson mb-4">
              "Geoff helped us secure patents that were essential to our $2M funding round. His clear explanation of complex IP concepts made the process so much easier than I expected."
            </blockquote>
            <cite class="block text-dobbin-dark-green font-bold font-crimson">- Lee Von Gunten, CEO of Watchdog Manufacturing</cite>
            <div class="mt-6">
              <a href="/testimonials" class="text-dobbin-dark-green font-semibold hover:underline flex items-center gap-1">
                See what other clients say
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- How We Make IP Protection Simple -->
    <section class="py-16">
      <div class="container mx-auto px-4 max-w-6xl">
        <h2 class="text-3xl font-bold text-center font-crimson text-dobbin-dark-green mb-12">How We Make IP Protection Simple</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="bg-white rounded-lg shadow-lg p-6 transition hover:shadow-xl">
            <div class="flex items-center justify-center w-16 h-16 bg-dobbin-dark-green rounded-full text-white mb-6 mx-auto">
              <span class="text-2xl font-bold">1</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-center font-crimson">Complementary Strategy Session</h3>
            <p class="text-gray-600 font-crimson">
              We start with a free strategy session to understand your invention and goals. 
              You'll leave with clarity on your options, timeline, and costs.
            </p>
          </div>
          
          <!-- Step 2 -->
          <div class="bg-white rounded-lg shadow-lg p-6 transition hover:shadow-xl">
            <div class="flex items-center justify-center w-16 h-16 bg-dobbin-dark-green rounded-full text-white mb-6 mx-auto">
              <span class="text-2xl font-bold">2</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-center font-crimson">Clear, Strategic Path</h3>
            <p class="text-gray-600 font-crimson">
              We'll create a straightforward protection plan in plain language, so you understand 
              exactly what's happening at each stage of the process.
            </p>
          </div>
          
          <!-- Step 3 -->
          <div class="bg-white rounded-lg shadow-lg p-6 transition hover:shadow-xl">
            <div class="flex items-center justify-center w-16 h-16 bg-dobbin-dark-green rounded-full text-white mb-6 mx-auto">
              <span class="text-2xl font-bold">3</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-center font-crimson">Ongoing Partnership</h3>
            <p class="text-gray-600 font-crimson">
              We're with you for the long haul. From application to approval and beyond, we're your 
              IP partner as your business grows.
            </p>
          </div>
        </div>
        
        <!-- CTA Button -->
        <div class="mt-12 text-center">
          <a href="#scheduleForm" @click.prevent="scrollToScheduleForm" class="bg-dobbin-dark-green text-white font-bold py-3 px-8 rounded-lg inline-block transition hover:bg-opacity-90 transform hover:scale-105 shadow-lg text-lg">
            Get Started Today
          </a>
        </div>
      </div>
    </section>
    
    <!-- About Geoff Section -->
    <section class="py-16 bg-gray-50">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="flex flex-col md:flex-row gap-12 items-center">
          <div class="md:w-1/3">
            <img src="/img/geoff-dobbin.jpg" alt="Geoff Dobbin" class="rounded-lg shadow-lg mx-auto">
          </div>
          
          <div class="md:w-2/3">
            <h2 class="text-3xl font-bold mb-6 font-crimson text-dobbin-dark-green">Meet Your Attorney</h2>
            <p class="text-gray-700 mb-6 font-crimson">
              For over 20 years, Geoff Dobbin has assisted independent inventors and other creators with 
              protecting their intellectual property. With a background in physics, he quickly grasps complex 
              concepts across diverse industries.
            </p>
            <p class="text-gray-700 mb-6 font-crimson">
              Since founding Dobbin IP Law P.C. in 2004, Geoff has focused on making patent law accessible 
              to independent inventors and small businesses. He believes that clear communication and strategic 
              guidance are just as important as legal expertise.
            </p>
            <div class="flex flex-wrap gap-4 mb-6">
              <div class="bg-white p-4 rounded-lg shadow flex items-center gap-3 min-w-[180px]">
                <div class="bg-dobbin-dark-green rounded-full w-12 h-12 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Patents Secured</p>
                  <p class="font-bold text-dobbin-dark-green">100+</p>
                </div>
              </div>
              <div class="bg-white p-4 rounded-lg shadow flex items-center gap-3 min-w-[180px]">
                <div class="bg-dobbin-dark-green rounded-full w-12 h-12 flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Years of Experience</p>
                  <p class="font-bold text-dobbin-dark-green">20+</p>
                </div>
              </div>
            </div>
            <a href="/about" class="text-dobbin-dark-green font-semibold hover:underline flex items-center gap-1">
              Learn more about Geoff
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Schedule Form Section -->
    <section class="py-16 bg-dobbin-dark-green" id="scheduleForm">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-6 text-center font-crimson text-dobbin-dark-green">
            Schedule Your Complementary Strategy Session
          </h2>
          <p class="text-center text-gray-600 mb-8 font-crimson">
            Take the first step toward protecting your valuable ideas. 
            No obligation, just clear guidance on your path forward.
          </p>
          
          <!-- Form goes here - simplified mockup -->
          <form class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-gray-700 font-medium mb-2">Your Name</label>
                <input type="text" id="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dobbin-dark-green focus:border-dobbin-dark-green">
              </div>
              <div>
                <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
                <input type="email" id="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dobbin-dark-green focus:border-dobbin-dark-green">
              </div>
            </div>
            <div>
              <label for="phone" class="block text-gray-700 font-medium mb-2">Phone Number</label>
              <input type="tel" id="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dobbin-dark-green focus:border-dobbin-dark-green">
            </div>
            <div>
              <label for="message" class="block text-gray-700 font-medium mb-2">Tell us about your invention or IP needs (optional)</label>
              <textarea id="message" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dobbin-dark-green focus:border-dobbin-dark-green"></textarea>
            </div>
            <div class="flex justify-center">
              <button type="submit" class="bg-dobbin-dark-green text-white font-bold py-3 px-8 rounded-lg transition hover:bg-opacity-90 transform hover:scale-105 shadow-lg text-lg">
                Request My Strategy Session
              </button>
            </div>
          </form>
          
          <!-- Alternative Contact -->
          <div class="mt-8 text-center">
            <p class="text-gray-600 font-crimson">Or call us directly at:</p>
            <p class="font-bold text-dobbin-dark-green text-2xl font-crimson">(801) 969-6609</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Page CTA Component -->
    <PageCTA />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PageCTA from '../components/PageCTA.vue';

// Video modal state
const isVideoModalOpen = ref(false);
const videoModalSrc = ref('');

// Methods to handle the video modal
function openVideoModal() {
  // YouTube embed URL with autoplay parameter
  videoModalSrc.value = 'https://www.youtube.com/embed/ljNiDscQ-Vw?autoplay=1';
  isVideoModalOpen.value = true;
  
  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  isVideoModalOpen.value = false;
  // Reset video src to stop playback
  videoModalSrc.value = '';
  
  // Re-enable body scrolling
  document.body.style.overflow = '';
}

// Method to scroll to schedule form
function scrollToScheduleForm(event) {
  event.preventDefault();
  document.getElementById('scheduleForm').scrollIntoView({ behavior: 'smooth' });
}

// Close modal when Escape key is pressed
onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isVideoModalOpen.value) {
      closeVideoModal();
    }
  });
});

useHead({
  title: 'Dobbin IP Law P.C. | Clear & Strategic Patent Attorney | Utah',
  meta: [
    { 
      name: 'description', 
      content: 'Navigate IP law with confidence. Dobbin IP Law makes patent, trademark, and copyright protection simple with clear guidance and strategic solutions for inventors and businesses.' 
    }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap' }
  ]
})
</script>

<style>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Animation for hover effects */
a, button {
  transition: all 0.3s ease;
}

/* Shadow effects */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* YouTube responsive container */
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

/* Modal animation */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

/* Adjust the max width for desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
  }
}
</style>