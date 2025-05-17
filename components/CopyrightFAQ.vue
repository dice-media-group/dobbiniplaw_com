<template>
  <div>
    <!-- FAQ Section Header -->
    <section class="py-8 bg-dobbin-dark-green text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold font-crimson" id="faq">Frequently Asked Questions About Copyrights</h2>
        </div>
      </div>
    </section>
    
    <!-- FAQ Items Section - with chalkboard background -->
    <section class="py-8 copyright-faq-bg">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- FAQ Items -->
          <div class="mb-8">
            <div v-for="(faq, index) in faqs.slice(0, 6)" :key="index" class="mb-4 border-b border-gray-200">
              <button 
                class="w-full text-left py-4 px-6 font-bold flex justify-between items-center focus:outline-none bg-white font-crimson"
                @click="toggleFAQ(index)"
              >
                <span>{{ faq.question }}</span>
                <span v-if="activeFAQ !== index" class="transform transition-transform">+</span>
                <span v-else class="transform transition-transform">−</span>
              </button>
              
              <!-- Animated FAQ Answer Container -->
              <div 
                ref="faqContent"
                class="bg-white overflow-hidden transition-max-height"
                :style="getFaqContentStyle(index)"
              >
                <div class="py-4 px-6" :id="`faq-content-${index}`" ref="faqContentInner">
                  <div v-html="faq.answer" class="font-crimson"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- View More FAQs Button -->
          <div class="text-center">
            <button 
              @click="toggleMoreFAQs" 
              class="bg-dobbin-green hover:bg-dobbin-dark-green text-white py-2 px-6 rounded-md inline-block font-crimson"
            >
              {{ showMoreFAQs ? 'Show Fewer FAQs' : 'View More FAQs' }}
            </button>
          </div>
          
          <!-- Additional FAQs (Hidden by Default) - Now with Transition -->
          <transition
            name="slide-fade"
            @enter="startTransition"
            @leave="endTransition"
          >
            <div v-if="showMoreFAQs" class="mt-8 overflow-hidden" ref="moreFAQs">
              <div v-for="(faq, index) in faqs.slice(6)" :key="index + 6" class="mb-4 border-b border-gray-200">
                <button 
                  class="w-full text-left py-4 px-6 font-bold flex justify-between items-center focus:outline-none bg-white font-crimson"
                  @click="toggleFAQ(index + 6)"
                >
                  <span>{{ faq.question }}</span>
                  <span v-if="activeFAQ !== index + 6" class="transform transition-transform">+</span>
                  <span v-else class="transform transition-transform">−</span>
                </button>
                
                <!-- Animated FAQ Answer Container -->
                <div 
                  ref="faqContent"
                  class="bg-white overflow-hidden transition-max-height"
                  :style="getFaqContentStyle(index + 6)"
                >
                  <div class="py-4 px-6" :id="`faq-content-${index + 6}`" ref="faqContentInner">
                    <div v-html="faq.answer" class="font-crimson"></div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, computed } from 'vue';

// Full list of FAQs with questions and HTML answers
const faqs = ref([
  {
    question: "What is a copyright?",
    answer: "A copyright is a protectable interest granted to an author (or other artist) to protect his/her work from being copied by another person or entity. Bear in mind, it protects from copying, not independent creation. It also does not protect ideas, but the expression of those ideas in tangible or appreciable form. Like patents, the ability to protect copyrights comes from Article 1, section 8 of our Constitution."
  },
  {
    question: "How do I get a copyright?",
    answer: "Copyrights automatically vest in the author from the moment a work is fixed in some form of tangible or performable medium."
  },
  {
    question: "What types of things can be copyrighted?",
    answer: "Any work of art in any form, and art is construed broadly to include about anything that requires creative effort, including the text on this website."
  },
  {
    question: "Do I have to register my copyright?",
    answer: "No. Like trademarks, because a copyright automatically vests in the author, it does not have to be registered to exist. However, registration provides certain benefits that you, as an author, may wish to have."
  },
  {
    question: "What benefits do I get if I register my copyright?",
    answer: "The primary benefit is notice to the world of what you created. As we said before, copyright does not protect from independent creation. So, if no one knows what you have done, how can anyone copy you? That is a second benefit, a presumption that a later author copied your work. Perhaps most importantly, you cannot sue under Federal copyright law unless your work is registered. There are others, but these are the big three."
  },
  {
    question: "How long does it take to register a copyright?",
    answer: "It depends on what you are attempting to register. Simple works of visual art may take a few weeks or months. Movies could take a year or so."
  },
  {
    question: "How much is it to register my copyright?",
    answer: "We currently charge $200 to file a copyright registration application. This includes the $55 registration fee, our preparation of samples, the filing of your application, non-substantive office actions, point of contact for the copyright office, continued support in marking and use, and postage (up to $15). If you qualify for the $35 registration fee, we will only charge you $180."
  },
  {
    question: "How long does my registered copyright last?",
    answer: "Assuming the work was created after 1978, copyright protection generally lasts for the life of the author plus 70 years. If it is a work made for hire (for a corporation) or an anonymous/pseudonymous work (where the author cannot be determined) it will last for 95 years from the date of publication or 120 years from the date of creation, which ever is earlier. As an example, the text of this website has a copyright that will last until 2107 because it was made for a corporation (Dobbin IP Law, P.C.). If, instead, Geoff Dobbin was a sole proprietor and he created the website himself, it would last as long as he was alive plus 70 years."
  },
  {
    question: "What is the difference between a copyright and a design patent?",
    answer: "A design patent is a patent that is granted by the government for a new ornamental design for a useful object. A copyright is an automatically vested right in some work of art, such as a sculpture. The design patent lasts for a much shorter period of time (14 years), must be examined and approved by the USPTO and protects the design of the object absolutely (independent creation is no defense). Copyrights are registered, last longer, but only protect against copying. Yes, you can have both."
  },
  {
    question: "What is \"fair use\" in copyright law?",
    answer: "Fair use is the idea that certain uses of copyrighted material are allowable in the furtherance of public discussion and debate and for accommodation of our present lifestyle. There are certain limitations to a copyright holder's rights explicitly given in U.S. Copyright law, including a general fair use exemption given in section 107 for the purpose of \"criticism, comment, news reporting, teaching (including multiple copies for classroom use), scholarship, or research….\" Generally, the use must be limited to what is necessary for the purpose. The US Supreme Court has also determined that \"time-shifting\" (e.g. the recording of a TV show for later viewing) is also fair use. There is currently no definitive statement on the \"format-shifting\" or \"space-shifting\" of digital and other media. If you have questions as to whether or not your particular use would be considered \"fair use,\" please feel free to <a href=\"/contact\">contact us</a> to discuss your situation."
  }
]);

// FAQ handling
const activeFAQ = ref(null);
const showMoreFAQs = ref(false);
const moreFAQs = ref(null);
const faqHeights = ref({});

// Get content style for each FAQ based on whether it's active
const getFaqContentStyle = (index) => {
  if (activeFAQ.value === index) {
    // Get the height from our faqHeights object if available, or use 'auto'
    return { 
      maxHeight: faqHeights.value[index] ? `${faqHeights.value[index]}px` : 'auto',
      opacity: 1
    };
  } else {
    return { 
      maxHeight: '0px',
      opacity: 0
    };
  }
};

// Toggle FAQ answer visibility with animation
const toggleFAQ = async (index) => {
  // If the same FAQ is clicked twice, close it
  if (activeFAQ.value === index) {
    activeFAQ.value = null;
    return;
  }
  
  // Otherwise, open the clicked FAQ
  activeFAQ.value = index;
  
  // Wait for the DOM to update before measuring the content
  await nextTick();
  
  // Find the content of the current FAQ and measure its height
  const contentId = `faq-content-${index}`;
  const contentEl = document.getElementById(contentId);
  
  if (contentEl) {
    // Store the height for animation
    faqHeights.value[index] = contentEl.scrollHeight;
  }
};

// Improved toggle with animation for the additional FAQs
const toggleMoreFAQs = () => {
  showMoreFAQs.value = !showMoreFAQs.value;
  // Reset active FAQ when toggling the display
  activeFAQ.value = null;
};

// Animation for entering content
const startTransition = (element) => {
  // Start height at 0
  element.style.height = '0';
  
  // Get natural height
  const height = element.scrollHeight;
  
  // Set initial state for animation
  element.style.height = '0';
  element.style.opacity = '0';
  element.style.overflow = 'hidden';
  
  // Force browser to acknowledge initial state before transition
  void element.offsetHeight;
  
  // Start transition
  element.style.transition = 'height 0.5s ease-in-out, opacity 0.5s ease-in-out';
  element.style.height = `${height}px`;
  element.style.opacity = '1';
  
  // Clean up after animation completes
  setTimeout(() => {
    element.style.height = 'auto';
  }, 500);
};

// Animation for leaving content
const endTransition = (element) => {
  // Get current height
  const height = element.scrollHeight;
  
  // Set fixed height to avoid jumping
  element.style.height = `${height}px`;
  
  // Force browser to acknowledge initial state before transition
  void element.offsetHeight;
  
  // Start transition to 0 height
  element.style.transition = 'height 0.5s ease-in-out, opacity 0.5s ease-in-out';
  element.style.height = '0';
  element.style.opacity = '0';
};
</script>

<style scoped>
/* Updated background for FAQ section to use chalkboard background */
.copyright-faq-bg {
  background-image: url('https://dobbiniplaw.com/wp-content/uploads/2016/10/Diagrams2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

/* Add inner shadow to match original site */
.copyright-faq-bg::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  pointer-events: none;
  z-index: 0;
}

.copyright-faq-bg > * {
  position: relative;
  z-index: 1;
}

/* FAQ animations */
.transition-max-height {
  transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
}

/* Slide animation for expanding/collapsing FAQs */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s ease, height 0.5s ease;
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  height: 0;
}
</style>