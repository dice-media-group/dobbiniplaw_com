<template>
  <div>
    <!-- Header Section -->
    <!-- Use the reusable hero banner component with just title -->
    <HeroBanner title="Prior Work">
      <p class="font-crimson text-white">
      </p>
    </HeroBanner>
    
    <!-- Content Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <p class="mb-6">
            At Dobbin IP Law, we have helped numerous clients protect their intellectual property through patents, trademarks, and copyrights. While client confidentiality prevents us from sharing specific details about many of our cases, below are some examples of the types of work we have done.
          </p>
          
          <h2 class="text-xl font-bold mb-4">Patent Examples</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Mechanical Device Patent</h3>
              <p>
                Successfully secured utility patent protection for a innovative mechanical device designed to improve efficiency in manufacturing processes.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Software Patent</h3>
              <p>
                Obtained patent protection for a software-based system that improves data processing efficiency through a novel algorithm.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Consumer Product Patent</h3>
              <p>
                Secured design patent protection for a distinctive consumer product with unique ornamental features.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Medical Device Patent</h3>
              <p>
                Obtained patent protection for a medical device that improves patient outcomes through innovative technology.
              </p>
            </div>
          </div>
          
          <h2 class="text-xl font-bold mb-4">Trademark Examples</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Retail Brand Trademark</h3>
              <p>
                Successfully registered a distinctive word mark and logo for a retail brand, providing nationwide protection.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Service Company Trademark</h3>
              <p>
                Secured trademark registration for a service-based business, including both name and slogan protection.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Product Line Trademark</h3>
              <p>
                Obtained trademark protection for a product line, ensuring brand consistency and protection across multiple items.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Trademark Enforcement</h3>
              <p>
                Successfully enforced trademark rights against unauthorized use, resolving the issue through cease and desist proceedings.
              </p>
            </div>
          </div>
          
          <h2 class="text-xl font-bold mb-4">Copyright Examples</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Software Copyright</h3>
              <p>
                Registered copyright protection for software code, providing additional legal protection beyond patent coverage.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Literary Work Copyright</h3>
              <p>
                Secured copyright registration for books and educational materials, protecting the author's creative expression.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Multimedia Copyright</h3>
              <p>
                Obtained copyright protection for multimedia presentations, ensuring proper ownership of creative content.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Copyright Licensing</h3>
              <p>
                Drafted and negotiated copyright licensing agreements, enabling monetization while maintaining proper control.
              </p>
            </div>
          </div>
          
          <div class="bg-gray-100 p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Contact Us About Your Project</h2>
            <p class="mb-4">
              Each intellectual property project is unique. Contact us today to discuss your specific needs and how we can help protect your valuable innovations, brands, and creative works.
            </p>
            <div class="text-center">
              <NuxtLink to="/contact" class="inline-block bg-dobbin-green hover:bg-green-900 text-white font-bold py-2 px-6">
                Schedule a Strategy Session
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Prior Work | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Examples of our work in patents, trademarks, and copyrights for a wide range of clients and industries.' }
  ]
})
</script>