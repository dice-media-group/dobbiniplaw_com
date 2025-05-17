<template>
  <div>
    <!-- FAQ Section Header -->
    <section class="py-8 bg-dobbin-dark-green">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold font-crimson text-white text-opacity-100" id="faq">Frequently Asked Questions About Trademarks</h2>
        </div>
      </div>
    </section>
    
    <!-- FAQ Items Section - with chalkboard background -->
    <section class="py-8 trademark-faq-bg">
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
          
          <!-- View More FAQs Button - IMPROVED CONTRAST -->
          <div class="text-center">
            <button 
              @click="toggleMoreFAQs" 
              class="bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white py-2 px-6 rounded-md inline-block font-crimson font-bold shadow-md"
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
    question: "What is a Trademark?",
    answer: "A trademark can be anything you use to identify yourself and your goods and/or services in commerce. Think of them as your name. How did your teacher know whose test was whose when grading them? You put your name on it. It's the same idea. Most trademarks can be categorized as \"word marks\" (names) or \"design marks\" (logos)."
  },
  {
    question: "How do I get a trademark?",
    answer: "Trademarks are what we like to call a \"bootstrappable\" right. You create them by pulling yourself up your own bootstraps. Use the mark and, if no one else is using it, you will naturally create goodwill and secondary meaning in the mark that associates it with you and creates a common law trademark. That is why you apply for a \"grant\" of a patent, but you \"register\" a trademark. One must be given to you; the other you create yourself and must let the world know."
  },
  {
    question: "Do I have to register a trademark before I use it?",
    answer: "No. Trademark rights are created by use, not registration. In fact, while you may file for registration before you actually use the mark, you must use it in interstate commerce before it will finally register. Many trademark owners even decide to forego the registration process entirely and just rely on the common law protections."
  },
  {
    question: "What benefits do I have if I register a trademark?",
    answer: "Registration of a trademark is treated as if the mark is in use everywhere in the United States. Common law rights only accrue where you use them. So if you only are selling your goods in two states, you have common law rights in those two states. Registration is good in all fifty and can be used as a springboard to register rights outside the United States. Registration also provides assumptions as to the strength and ownership of the trademark in the event you have to sue somebody (or are sued) and can be used as a basis for customs inspectors to seize imported counterfeit goods."
  },
  {
    question: "What is required to register a trademark?",
    answer: "You must be using the mark on goods or using it to advertise services in interstate commerce. Interstate commerce means that you must be crossing state lines (not just your home state). Using the trademark on the goods means that you must have the trademark physically on the goods themselves or their packaging.<br><br>After you file for registration of a trademark, it will be examined to determine if anyone else is using the mark for similar goods/services (likelihood of confusion) and if the mark is even capable of identifying your goods apart from someone else's similar goods (secondary meaning). If there is someone else using the mark for the same or similar goods/services, you will not be able to register the mark and may have to choose something else before that someone else sues you. If the mark is merely descriptive (or worse, generic) of what you are selling, it will lack the ability to distinguish your goods from others' and will be refused."
  },
  {
    question: "How long does it take to register a trademark?",
    answer: "Assuming all goes smoothly, you can register a trademark within a year of filing."
  },
  {
    question: "How much does an application for registration cost?",
    answer: "If you are currently using the mark, we charge $500 to prepare and file your trademark application, for one mark and one class. This includes the $275 government filing fee for a single mark in a single class, preparing and filing the application, responses to non-substantive office actions, tracking during the pendency of the application, reporting status of the application to you, serving as a point of contact with the USPTO (and some junk mail), continued support in proper use of the mark, and lifetime tracking and docketing of the mark after registration. For additional classes, we charge an additional $300.<br><br>If your application is an intent-to-use application (you're not using your mark yet). You have the application costs as described above, but you will also need to file an additional statement of use before the mark can be registered. This is an additional cost of $225 which includes a $100 government filing fee per class and our preparation of the statement. If your mark is used in more than one class, we charge an additional $125 per class."
  },
  {
    question: "What is a class?",
    answer: "All goods and services are divided into 45 different classes in the USPTO. The goods and services in each class are generally related to each other. For instance, electronic devices tend to be classified in class 9 and firearms in class 13. These classes are used internationally. The theory is that if you are in the same class of goods or services as someone else and your marks are too similar, then it will cause consumer confusion. Call for a strategy session to determine where your goods or services may be classified."
  },
  {
    question: "What is the difference between ® and TM?",
    answer: "The ® means that the mark has been registered with the USPTO or some other government authority. It should not be used unless and until such registration has occurred. The \"TM\" means that you are claiming trademark rights under common law."
  },
  {
    question: "How do I keep my trademark?",
    answer: "The first step to keep a trademark is to keep using it. Even if you let a registration lapse, if you keep using a mark it will retain the common law rights. Second, if you wish to maintain a registration, you must periodically file a statement with the USPTO that you are still using the mark and apply for renewal. The fees are relatively minor and the first set is due between the 5th and 6th years of registration. The second set is due between the 9th and 10th years, and then every 10 years thereafter."
  },
  {
    question: "How long does a trademark last?",
    answer: "As long as you keep using it, you will maintain your common law rights. As long as you do so and keep paying the renewals, the registration will continue as well."
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
.trademark-faq-bg {
  background-image: url('https://dobbiniplaw.com/wp-content/uploads/2016/10/Diagrams2.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

/* Add inner shadow to match original site */
.trademark-faq-bg::before {
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

.trademark-faq-bg > * {
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