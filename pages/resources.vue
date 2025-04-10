<template>
  <div>
    <!-- Header Section -->
    <section class="bg-dobbin-green text-white py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold mb-4">IP Resources</h1>
        <p class="mb-2">Helpful information about intellectual property</p>
      </div>
    </section>
    
    <!-- Content Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <p class="mb-6">
            At Dobbin IP Law, we believe in educating our clients about intellectual property protection. This resource page provides information about patents, trademarks, and copyrights to help you better understand these important legal protections.
          </p>
          
          <h2 class="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          
          <div class="mb-8">
            <div class="mb-4">
              <h3 class="font-bold mb-2">What is intellectual property?</h3>
              <p>
                Intellectual property (IP) refers to creations of the mind, such as inventions, literary and artistic works, designs, symbols, names, and images used in commerce. IP is protected by law through patents, copyrights, trademarks, and trade secrets, which enable people to earn recognition or financial benefit from what they invent or create.
              </p>
            </div>
            
            <div class="mb-4">
              <h3 class="font-bold mb-2">What's the difference between patents, trademarks, and copyrights?</h3>
              <p>
                Patents protect inventions and innovations. Trademarks protect brand names, logos, and slogans used to identify products or services. Copyrights protect original works of authorship, such as books, music, art, and software.
              </p>
            </div>
            
            <div class="mb-4">
              <h3 class="font-bold mb-2">Do I need to register my copyright?</h3>
              <p>
                While copyright protection exists automatically when a work is created in fixed form, registration with the U.S. Copyright Office provides important benefits, including the ability to sue for infringement and seek statutory damages and attorney's fees.
              </p>
            </div>
            
            <div class="mb-4">
              <h3 class="font-bold mb-2">How long does it take to get a patent?</h3>
              <p>
                The patent process typically takes 2-3 years from filing to issuance, though it can be longer for complex technologies. Factors affecting the timeline include the backlog at the USPTO, the complexity of the invention, and how quickly you respond to office actions.
              </p>
            </div>
            
            <div class="mb-4">
              <h3 class="font-bold mb-2">How much does it cost to get a trademark?</h3>
              <p>
                The cost of obtaining a trademark includes USPTO filing fees (starting at $250-$350 per class of goods/services) and attorney fees for search, application preparation, and prosecution. Total costs typically range from $1,000 to $2,500 for a straightforward application.
              </p>
            </div>
            
            <div class="mb-4">
              <h3 class="font-bold mb-2">Can I patent my idea?</h3>
              <p>
                Ideas alone cannot be patented; a patent requires a concrete invention that is new, useful, and non-obvious. The invention must be described in sufficient detail to enable someone skilled in the field to make and use it.
              </p>
            </div>
            
            <div class="mb-4">
              <h3 class="font-bold mb-2">How long do intellectual property rights last?</h3>
              <p>
                Utility and plant patents last 20 years from filing date. Design patents last 15 years from issuance date. Trademarks can last indefinitely as long as they remain in use and renewals are filed. Copyrights generally last the author's lifetime plus 70 years.
              </p>
            </div>
            
            <div>
              <h3 class="font-bold mb-2">Do I need an attorney to file for intellectual property protection?</h3>
              <p>
                While you can file applications yourself, working with an experienced IP attorney significantly increases your chances of success. The application processes are complex, and mistakes can limit your protection or result in rejection.
              </p>
            </div>
          </div>
          
          <h2 class="text-xl font-bold mb-4">Useful Links</h2>
          
          <div class="mb-8">
            <h3 class="font-bold mb-2">Government Resources</h3>
            <ul class="list-disc ml-6 mb-4">
              <li class="mb-2">
                <a href="https://www.uspto.gov/" target="_blank" rel="noopener noreferrer" class="text-dobbin-green hover:underline">
                  United States Patent and Trademark Office (USPTO)
                </a>
              </li>
              <li class="mb-2">
                <a href="https://www.copyright.gov/" target="_blank" rel="noopener noreferrer" class="text-dobbin-green hover:underline">
                  U.S. Copyright Office
                </a>
              </li>
              <li>
                <a href="https://www.wipo.int/" target="_blank" rel="noopener noreferrer" class="text-dobbin-green hover:underline">
                  World Intellectual Property Organization (WIPO)
                </a>
              </li>
            </ul>
            
            <h3 class="font-bold mb-2">Educational Resources</h3>
            <ul class="list-disc ml-6">
              <li class="mb-2">
                <a href="https://www.uspto.gov/learning-and-resources" target="_blank" rel="noopener noreferrer" class="text-dobbin-green hover:underline">
                  USPTO Learning and Resources
                </a>
              </li>
              <li class="mb-2">
                <a href="https://www.copyright.gov/circs/" target="_blank" rel="noopener noreferrer" class="text-dobbin-green hover:underline">
                  Copyright Office Circulars and Brochures
                </a>
              </li>
              <li>
                <a href="https://www.wipo.int/academy/en/" target="_blank" rel="noopener noreferrer" class="text-dobbin-green hover:underline">
                  WIPO Academy
                </a>
              </li>
            </ul>
          </div>
          
          <div class="bg-gray-100 p-6">
            <h2 class="text-xl font-bold mb-4">Still Have Questions?</h2>
            <p class="mb-4">
              Contact us today for a complementary strategy session to discuss your specific intellectual property needs and questions.
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
  title: 'IP Resources | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Resources and information about patents, trademarks, and copyrights to help you understand intellectual property protection.' }
  ]
})
</script>