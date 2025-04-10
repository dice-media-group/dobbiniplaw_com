<template>
  <div>
    <!-- Hero Banner Section -->
    <section class="bg-dobbin-dark-green text-white py-12 w-full">
      <div class="container mx-auto">
        <div class="mx-auto px-4 max-w-[1140px]">
          <h1 class="text-3xl mb-3 font-crimson text-white">Patent Information</h1>
          <h2 class="text-xl mb-4 font-crimson text-white">With Frequently Asked Questions</h2>
        </div>
      </div>
    </section>
    
    <!-- Introduction Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- FAQ Button - Positioned on the right -->
          <div class="flex justify-end mb-6">
            <a href="#faq" class="bg-dobbin-green hover:bg-dobbin-dark-green text-white py-2 px-4 rounded-md inline-block text-sm">
              Click to View Frequently Asked Questions About Patents
            </a>
          </div>
          
          <div class="mb-6">
            <h3 class="text-xl font-bold mb-4 font-crimson">You have invented... something.</h3>
          </div>
          
          <div class="flex flex-col md:flex-row items-center gap-8 mb-10">
            <div class="md:w-1/4">
              <img src="/img/Light-Bulb.png" alt="Light bulb representing ideas and inventions" class="max-w-full h-auto mx-auto" />
            </div>
            <div class="md:w-3/4">
              <p class="mb-4 font-crimson">
                It may be the newest kitchen or household gadget, a new method of manufacturing a product, a new process, anything. Either way, it will change the world for the better; but, what do you do with it now? At Dobbin IP Law, we can help you protect your invention.
              </p>
              <p class="font-crimson">
                We secure patents so that only you may control it for years to come. With even the most complex inventions and industries, we pick technology up quickly so as to provide you with the highest quality legal service possible. We work closely with our clients so we can provide the best representation possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- How Patents Work Section (with blackboard background) -->
    <section class="w-full patent-work-banner py-16 bg-center bg-cover relative">
      <div class="absolute inset-0 bg-black bg-opacity-70"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-white font-crimson">How Does a Patent Work?</h2>
        </div>
      </div>
    </section>
    
    <!-- Patent Description Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <p class="mb-6 font-crimson">
            A patent is a property right often referred to as a "limited monopoly." It is designed to give inventors the right to exclude others from using, manufacturing, and selling their inventions in a given country. Before receiving a patent, inventors must disclose the process by which their invention is made and how it works. As a part of the bargain, after a patent expires, the invention is released into public domain for all to use and improve.
          </p>
        </div>
      </div>
    </section>
    
    <!-- Types of Patents Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h3 class="text-xl font-bold mb-6 font-crimson">There are three types of patents:</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <!-- Utility Patents -->
            <div class="border border-gray-200 p-6 rounded-lg shadow-sm">
              <div class="flex justify-center mb-4">
                <span class="text-3xl text-dobbin-green">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </span>
              </div>
              <h4 class="text-lg font-bold mb-2 text-center font-crimson">Utility Patents</h4>
              <p class="font-crimson">A utility patent is the most common type. A patent in this category is based on the processes or machines by which the invention operates. Manufacturing improvements also fit into this category. The object or process that is described must be new, non-obvious and useful. Most utility patents last between 17-20 years.</p>
            </div>
            
            <!-- Design Patents -->
            <div class="border border-gray-200 p-6 rounded-lg shadow-sm">
              <div class="flex justify-center mb-4">
                <span class="text-3xl text-dobbin-green">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </span>
              </div>
              <h4 class="text-lg font-bold mb-2 text-center font-crimson">Design Patents</h4>
              <p class="font-crimson">A design patent focuses primarily on the appearance and ornamental design of the item being patented. These last 15 years.</p>
            </div>
            
            <!-- Plant Patents -->
            <div class="border border-gray-200 p-6 rounded-lg shadow-sm">
              <div class="flex justify-center mb-4">
                <span class="text-3xl text-dobbin-green">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </span>
              </div>
              <h4 class="text-lg font-bold mb-2 text-center font-crimson">Plant Patents</h4>
              <p class="font-crimson">A plant patent is issued to those who have discovered new varieties of plants through the process of asexual reproduction. They last 20 years from the date of filing the application.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Getting a Patent Section (with background) -->
    <section class="w-full patent-work-banner py-16 bg-center bg-cover relative">
      <div class="absolute inset-0 bg-black bg-opacity-70"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-white font-crimson">Getting a Patent</h2>
        </div>
      </div>
    </section>
    
    <!-- Patent Application Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <p class="mb-4 font-crimson">
            As one of the first steps in applying for a patent, you must decide if you want a provisional application or a non-provisional application. Whichever you decide upon, you will eventually need to file a non-provisional. However, many opt to start with the provisional application. In doing this, not only is the upfront cost lowered, but the words "patent pending" can be used on the product even as you continue to develop your invention before proceeding to the more final filing of the non-provisional patent application.
          </p>
          <p class="mb-6 font-crimson">
            Subsequently, you will need to decide whether or not to use a patent attorney. Our experience shows that many inventors can file a basic provisional patent application on their own; however, in doing so most risk not disclosing enough in the specification to support a patent. Also, in many cases, the time taken to draft a provisional application by yourself is usually measured in multiples over what a patent attorney would take, simply because we, as a whole, have done this many times before. Thus the results are faster and more complete. In any event, when the time comes to file the non-provisional application, it is highly beneficial to have an experienced attorney who knows how to work with the United States Patent & Trademark Office and how to meet all standards while making your patent as strong and broad as possible.
          </p>
        </div>
      </div>
    </section>
    
    <!-- The Search Section - UPDATED to match visual style -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold mb-6 text-dobbin-dark-green font-crimson">The Search</h2>
          
          <div class="flex flex-col md:flex-row items-start gap-8">
            <div class="md:w-1/6 flex justify-center">
              <div class="w-24 h-24 rounded-full border-2 border-dobbin-green flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14 text-dobbin-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <div class="md:w-5/6">
              <p class="font-crimson text-base">
                Since a patent is granted based on improvements an invention makes over the state of the art then known (the "prior art"), it is generally a good idea to examine the prior art to first determine if the invention appears patentable and that the invention does not infringe someone else's patent. We provide both patentability and freedom to operate opinions to help with your due diligence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Resources and Contact Section -->
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <!-- Download Guide -->
            <div>
              <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green font-crimson">Download a Step-by-Step Guide to Patents</h3>
              <div class="mb-6">
                <a href="/Patent.pdf" target="_blank">
                  <img src="/img/patent-guide-thumbnail.jpg" alt="Patent Guide" class="w-full border border-gray-300" />
                </a>
              </div>
              <div class="text-center">
                <a href="/Patent.pdf" target="_blank" class="bg-dobbin-green hover:bg-dobbin-dark-green text-white py-3 px-6 rounded-md inline-block font-crimson">
                  Download a Patent Guide
                </a>
              </div>
            </div>
            
            <!-- Contact an Attorney -->
            <div>
              <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green font-crimson">Contact an Experienced Patent Attorney</h3>
              <p class="mb-4 font-crimson">
                If you have any additional questions regarding patents, please review our Patent FAQs section below, containing answers to many commonly asked questions. Additionally, you can call to 
                <NuxtLink to="/contact" class="text-dobbin-green hover:text-dobbin-dark-green">schedule your complementary strategy session</NuxtLink> 
                where we can discuss the particulars of your invention and how we can help you.
              </p>
              <p class="mb-6 font-crimson">
                At Dobbin IP Law, we pride ourselves in being as honest and upfront with our clients as possible. So we will let you know as soon as possible whether or not we think your invention is patentable.
              </p>
              <div class="text-center">
                <NuxtLink to="/contact" class="bg-dobbin-green hover:bg-dobbin-dark-green text-white py-3 px-6 rounded-md inline-block font-crimson">
                  Schedule a Strategy Session
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Patent Carousel Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto mb-10">
          <h2 class="text-2xl font-bold mb-6 text-center text-dobbin-dark-green font-crimson">Our Patent Work</h2>
          <p class="text-center mb-8 font-crimson">
            Dobbin IP Law has secured patents in a wide range of technical fields. Below are some examples of our patent portfolio.
          </p>
        </div>
      </div>
      <PatentCarousel />
    </section>
    
    <!-- FAQ Section Header -->
    <section class="py-8 bg-dobbin-dark-green text-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-2xl font-bold font-crimson" id="faq">Frequently Asked Questions About Patents</h2>
        </div>
      </div>
    </section>
    
    <!-- FAQ Items Section - UPDATED background to Circuit-Board -->
    <section class="py-8 circuit-board-bg">
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
          
          <!-- YouTube Video Section -->
          <div class="mt-12 w-full">
            <div class="aspect-w-16 aspect-h-9 bg-white rounded-lg shadow-md overflow-hidden">
              <iframe 
                class="w-full h-full"
                src="https://www.youtube.com/embed/nDxe4du1ceQ" 
                title="What is a design patent?"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
              ></iframe>
            </div>
          </div>
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
    question: "What is a patent?",
    answer: "Historically, a patent was a grant of property from a government. The term was then attached to the monopolies governments gave out to inventors for <i>intellectual</i> property. Today a patent is an exclusive right given to an inventor to sell, use and make an invention for a limited period of time. In the United States, the granting of patents is actually one of the powers given to Congress in our Constitution (Article I, section 8)."
  },
  {
    question: "What types of patents are there?",
    answer: "In the United States there are three types of patents. The first is a utility patent. This is what most people think of when they say \"patent.\" It protects the useful features of an invention. The second is a design patent, which protects an object's unique design elements, and the third type is a plant patent, which protects new varieties of plants. This FAQ will deal primarily with utility patents, unless otherwise noted."
  },
  {
    question: "How long does a patent last?",
    answer: "Generally, a utility patent in the United States lasts 20 years from the date the application for the patent was filed or 17 years from the date it was issued, depending on which is longer. There are some procedural issues which may increase or decrease that term on an individual basis. A design patent lasts 15 years from the date of issue."
  },
  {
    question: "What's the difference between an idea and an invention?",
    answer: "An idea is just that: It is some thought that usually runs along the lines of \"wouldn't it be great if…\" An idea may be directed towards improving some current product, some creative use of new technology, or may be entirely new. However, the idea does not become an <i>invention</i> until it is reduced to practice – which means you implement the idea into a \"tangible\" form."
  },
  {
    question: "What can be patented?",
    answer: "Just about anything so long as it meets the statutory standards of utility, novelty, and non-obviousness. There are some statutory exceptions, like recipes, which cannot be patented by law."
  },
  {
    question: "What are the standards for patentability?",
    answer: "There are three main standards for patentability: utility, novelty, and non-obviousness. \"Utility\" means that the invention has some use. \"Novelty\" means that no one else has done it before, that the invention is totally new. \"Non-obviousness\" means that the invention, while new, must also be far enough removed from the prior art that you could not readily create the invention from just looking at the prior art (that it was truly invented, not assembled from known bits and pieces). This is the hardest standard to meet as, basically, the USPTO determines if the invention is \"worthy\" of a patent."
  },
  {
    question: "What is \"Prior art?\"",
    answer: "Everything which everyone, including you, has made before you invented your invention. We look at what was invented before to determine novelty and non-obviousness. What is relevant will depend on your invention. As an example, if you invent a new paper clip design, then we look at paper clips from the past to see if the standards of patentability are met."
  },
  {
    question: "How do you know what is in the prior art?",
    answer: "We look for it – usually in patent office records, but also online or in printed publications. A patentability search should be performed before any patent application is attempted so as to determine what is in the prior art and what difficulties may be encountered in the prosecution process. Of course, this is optional, as the patent examiner will also perform a search; but is highly recommended as the cost of a search is usually less than the cost of preparing and filing an application and can help avoid later problems (i.e. more expense) later in the prosecution of the application."
  },
  {
    question: "What does patent pending mean?",
    answer: "It means that a patent application for the invention has been filed somewhere. In the U.S. the application may be either a provisional or a non-provisional application."
  },
  {
    question: "Can I tell anyone about my invention before I file an application?",
    answer: "Generally no. The only people you can tell before filing an invention are those who have some form of duty of confidentiality to you – like an attorney. Disclosing your invention (which includes selling it) before filing an application ruins any possibility of utility patent protection outside of the United States. There is, however, a grace period of one year in the United States, during which time you must file an application or you will find you have committed it to the public domain forever."
  },
  {
    question: "How much does filing a patent application cost?",
    answer: "The cost for preparing an application, filing it, and then prosecuting the application toward a patent will vary depending on the complexity of the invention, state of the prior art, and other circumstances. The two main components are attorney's fees and the USPTO's fees. You can find the USPTO's fees on their website, but suffice it to say that as of 2024 a micro entity can electronically file a non-provisional application for around $400. A small entity will have to pay more for the same application. Filing a provisional application will cost you less depending on your status. The filing fees for a design patent are also different depending on your status. If you would like to discuss pricing, please feel free to set up a free consultation as we would need to see what you have before we could make an accurate determination of cost."
  },
  {
    question: "What is the difference between a provisional and non-provisional application?",
    answer: "A non-provisional application is what you would normally think of when you file an application: the USPTO receives the application and puts it in its queue for processing and examination. A provisional application is usually a truncated and bare-bones application that lays out the general principles and embodiments of the invention and is filed and sits in the patent office for up to one year. During that year, you are free to market, improve and perfect the invention. You are also allowed (and encouraged) to mark it as patent pending. However, it will expire after one year of pendancy and must be perfected by a non-provisional application. The non-provisional application is then treated as if it was filed on the date of the provisional."
  },
  {
    question: "How long does it take to get a patent?",
    answer: "It is currently taking 18 months to 2 years to hear anything from the USPTO after you file a non-provisional patent application, and usually it involves having to amend the application to conform with the patentability standards and new prior art. In all, it is usual for the process to take three years. Design patents are much quicker and can be granted within 1 year to 18 months of filing. Currently, the USPTO is working to expand its workforce and reduce this pendancy time."
  },
  {
    question: "Is there any way to hurry the process?",
    answer: "Yes, there are procedures to expedite the handling of a patent application. However, unless you meet criteria for age or the invention benefits the environment, the procedures require much larger fees paid to the USPTO. If you want to know more, we can discuss the matter on a case-by-case basis as expediting a patent application may or may not benefit your individual situation."
  },
  {
    question: "How much does it cost to keep and maintain my patent?",
    answer: "After your application is allowed, you must pay an issue fee to the USPTO, which varies depending on whether you're a small entity or micro entity. Then you receive your patent. You also have to maintain your patent by paying three maintenance fees, due 3.5, 7.5 and 11.5 years after the patent is issued. Design patents have no maintenance fees and have a lower issue fee that varies based on your entity status."
  },
  {
    question: "What's the difference between a micro entity, a small entity, and a large entity?",
    answer: "To qualify for a small entity, you must have less than 500 employees, or be a university or non-profit. If you do not qualify for a small entity, then you are a large entity.<br><br>To qualify for a micro entity, you must first qualify for a small entity. You must also not be listed as an inventor on more than four applications (this count excludes provisional, some international, and assigned applications). Neither you nor any other inventor may have a gross income more than three times the median household income (approximately $162,000) and you must not be obligated to grant, convey, or assign a license or ownership to an entity making more than three times the median household income."
  },
  {
    question: "I have a patent; now what do I do with it?",
    answer: "Congratulations! You have a monopoly that the government will enforce. You may either license the patent to someone else or exploit it yourself. In either event, you will need to police the market to protect your invention. We can help with this, too."
  },
  {
    question: "What about the poor man's patent?",
    answer: "A \"poor man's patent\" is a description of your invention that you have mailed to yourself. In theory, you save this document, unopened, until you need it to show that you invented whatever is enclosed in the envelope by the postmarked date. They are usually worth less than the cancelled stamp. Now, don't get us wrong. There is some value in being able to prove an invention date. However, that value is decreasing as the United States has become a \"first-to-file\" country (like every other nation in the world) and abandoning its current \"first-to-invent\" system. The key to remember is that the poor man's patent gives you absolutely no rights whatsoever. So if you disclose your invention, the one-year clock starts running and when that year is over you have absolutely nothing. If you do not disclose or exploit the invention, you could be held to have abandoned it. Since you have nothing, if someone just wants to sell a knock-off of your invention, you cannot stop them with a poor man's patent. Finally, if someone else innocently (having no knowledge of you) invents the same invention, they still have the ability to file for a patent in good conscience and, in a first-to-file system, who do you think will win if it goes to court?"
  },
  {
    question: "What's a trade secret?",
    answer: "A trade secret is anything that you believe gives you a competitive advantage over others in your field that you can and do keep secret. This intellectual property right is usually used for things that cannot be patented, like recipes. Think about the Kentucky Fried Chicken® Original Recipe and the Coca-Cola Classic® formula. These companies invest large sums of money advertising these products, touting the recipes, and also take great precautions to make sure the recipes stay secret. If someone were to steal them, these companies would have protectable rights and be entitled to recover the damages they suffer because of the theft."
  },
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

// SEO metadata
useHead({
  title: 'Patent Information | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Patent information and services to protect your inventions. Secure patents for your innovations with Dobbin IP Law P.C.' }
  ]
});
</script>

<style scoped>
.patent-diagram-bg {
  background-image: url('/img/Patent-Diagram.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.1;
}

/* Updated background for FAQ section to use Circuit-Board.png */
.circuit-board-bg {
  background-image: url('/img/Circuit-Board.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(240, 240, 240, 0.95);
  background-blend-mode: overlay;
  position: relative;
}

/* Add inner shadow to match original site */
.circuit-board-bg::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

.patent-work-banner {
  background-image: url('https://dobbiniplaw.com/wp-content/uploads/2016/10/Diagrams2.png');
  background-size: cover;
  background-position: center;
  position: relative;
}

/* Full width sections */
section.w-full {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
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

/* YouTube Video Responsive Container */
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.aspect-w-16 iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>