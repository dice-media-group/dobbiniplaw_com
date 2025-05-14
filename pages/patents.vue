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
          <!-- FAQ Button - Positioned on the right - IMPROVED CONTRAST -->
          <div class="flex justify-end mb-6">
            <a href="#faq" class="bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white py-2 px-4 rounded-md inline-block text-sm font-bold shadow-md">
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
                <a href="/Patent.pdf" target="_blank" class="bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white py-3 px-6 rounded-md inline-block font-crimson font-bold shadow-md">
                  Download a Patent Guide
                </a>
              </div>
            </div>
            
            <!-- Contact an Attorney -->
            <div>
              <h3 class="text-2xl font-bold mb-6 text-dobbin-dark-green font-crimson">Contact an Experienced Patent Attorney</h3>
              <p class="mb-4 font-crimson">
                If you have any additional questions regarding patents, please review our Patent FAQs section below, containing answers to many commonly asked questions. Additionally, you can call to 
                <NuxtLink to="/contact" class="text-dobbin-bright-green hover:text-dobbin-dark-green font-bold">schedule your complementary strategy session</NuxtLink> 
                where we can discuss the particulars of your invention and how we can help you.
              </p>
              <p class="mb-6 font-crimson">
                At Dobbin IP Law, we pride ourselves in being as honest and upfront with our clients as possible. So we will let you know as soon as possible whether or not we think your invention is patentable.
              </p>
              <div class="text-center">
                <NuxtLink to="/contact" class="bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white py-3 px-6 rounded-md inline-block font-crimson font-bold shadow-md">
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
    
    <!-- FAQ Component -->
    <PatentFAQ />
    
  </div>
</template>

<script setup>
import { useHead } from '#app';
import PatentFAQ from '~/components/PatentFAQ.vue';

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
</style>