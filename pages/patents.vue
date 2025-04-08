<template>
  <div>
    <!-- Header Section -->
    <section class="bg-dobbin-green text-white py-8">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold mb-4">Patent Services</h1>
        <p class="mb-2">Protecting Your Inventions</p>
      </div>
    </section>
    
    <!-- Content Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-xl font-bold mb-4">What are Patents?</h2>
          <p class="mb-6">
            Patents provide inventors with exclusive rights to make, use, and sell their inventions for a limited period of time. At Dobbin IP Law, we help individuals and businesses navigate the complex patent process to secure strong protection for their innovations.
          </p>
          
          <h2 class="text-xl font-bold mb-4">The Value of Patent Protection</h2>
          <p class="mb-4">
            Securing a patent for your invention provides several important benefits:
          </p>
          <ul class="list-disc ml-6 mb-6">
            <li class="mb-2">
              <strong>Exclusive Rights:</strong> A patent gives you the legal right to exclude others from making, using, or selling your invention
            </li>
            <li class="mb-2">
              <strong>Competitive Advantage:</strong> Patents help establish market dominance and prevent competitors from copying your innovations
            </li>
            <li class="mb-2">
              <strong>Business Value:</strong> Patents are valuable business assets that can increase company valuation and attract investors
            </li>
            <li class="mb-2">
              <strong>Revenue Generation:</strong> Patents can be licensed or sold to generate additional revenue streams
            </li>
            <li>
              <strong>Defensive Protection:</strong> A strong patent portfolio can deter infringement claims and support cross-licensing opportunities
            </li>
          </ul>
          
          <h2 class="text-xl font-bold mb-4">Our Patent Services</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Patent Searches & Assessments</h3>
              <p>
                Before investing in a patent application, it's important to understand whether your invention is likely to be patentable. We conduct thorough patent searches to identify prior art and provide assessments of patentability, enabling you to make informed decisions about pursuing patent protection.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Patent Application Preparation</h3>
              <p>
                We prepare high-quality patent applications designed to secure the broadest possible protection for your invention, including utility patent applications, design patent applications, provisional patent applications, and PCT international applications.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Patent Prosecution</h3>
              <p>
                We represent clients throughout the patent examination process, responding to office actions from patent examiners, conducting examiner interviews, drafting claim amendments to overcome rejections, and securing allowance and issuance of patents.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Patent Portfolio Management</h3>
              <p>
                For businesses with multiple patents, we provide strategic portfolio management, developing patent filing strategies aligned with business objectives, identifying key innovations for patent protection, and maintaining existing patents.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">Post-Grant Proceedings</h3>
              <p>
                We handle various post-grant proceedings to strengthen or challenge patents, including patent reexaminations, inter partes reviews, post-grant reviews, and ex parte reexaminations.
              </p>
            </div>
            
            <div class="p-4 border border-gray-200">
              <h3 class="font-bold mb-2">International Patent Protection</h3>
              <p>
                We help clients secure patent protection around the world through Patent Cooperation Treaty (PCT) applications, direct national filings in foreign countries, and regional patent applications.
              </p>
            </div>
          </div>
          
          <h2 class="text-xl font-bold mb-4">Types of Patents We Handle</h2>
          <p class="mb-4">
            We have experience with patents across a wide range of technologies and industries, including:
          </p>
          <ul class="list-disc ml-6 mb-6">
            <li class="mb-2">Software and computer-implemented inventions</li>
            <li class="mb-2">Mechanical devices and processes</li>
            <li class="mb-2">Electronics and electrical systems</li>
            <li class="mb-2">Medical devices and healthcare technologies</li>
            <li class="mb-2">Consumer products</li>
            <li class="mb-2">Manufacturing processes</li>
            <li class="mb-2">Biotechnology and life sciences</li>
            <li>Clean energy and environmental technologies</li>
          </ul>
          
          <div class="bg-gray-100 p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Why Choose Dobbin IP Law for Patent Services</h2>
            <ul class="list-disc ml-6">
              <li class="mb-2">
                <strong>Technical Backgrounds:</strong> Our attorneys have education and experience in various technical fields
              </li>
              <li class="mb-2">
                <strong>Strategic Approach:</strong> We develop patent strategies tailored to your specific business goals
              </li>
              <li class="mb-2">
                <strong>Clear Communication:</strong> We explain complex patent concepts in understandable terms
              </li>
              <li class="mb-2">
                <strong>Cost-Effective Solutions:</strong> We provide efficient services that maximize protection while controlling costs
              </li>
              <li>
                <strong>Client-Focused Service:</strong> We work closely with you throughout the patent process
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Call to Action Section -->
    <section class="py-8 bg-gray-100">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-2xl font-bold mb-4">Ready to Protect Your Invention?</h2>
        <p class="mb-4">Contact us today for a complementary strategy session to discuss your patent needs.</p>
        <p class="text-xl font-bold">
          <a href="tel:8019696609" class="text-dobbin-green hover:underline">(801) 969-6609</a>
        </p>
        <div class="mt-4">
          <NuxtLink to="/contact" class="inline-block bg-dobbin-green hover:bg-green-900 text-white font-bold py-2 px-6">
            Schedule a Strategy Session
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Patent Services | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Patent services to protect your inventions. We help individuals and businesses secure exclusive rights for their innovations.' }
  ]
})
</script>