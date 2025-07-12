<template>
  <div class="contact-page">
    <!-- Header Section -->
    <!-- Use the reusable hero banner component with just title -->
    <HeroBanner title="Contact Us">
      <p class="font-crimson text-white"></p>
    </HeroBanner>
    
    <!-- Contact Information Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div class="mb-6">
                <p class="mb-1 font-crimson">Dobbin IP Law P.C.</p>
                <p class="mb-1 font-crimson">2250 S Redwood Rd, Suite 5</p>
                <p class="mb-4 font-crimson">West Valley City, UT 84119</p>
                
                <p class="mb-1 font-crimson"><strong>Hours:</strong> 9:30 AM - 5:30 PM  MT  Tuesday-Friday</p>
              </div>
            </div>
            
            <div>
              <div class="mb-6">
                <p class="mb-1 font-crimson"><strong>Phone:</strong> <a href="tel:8019696609" class="hover:underline">(801) 969-6609</a></p>
                <p class="mb-1 font-crimson"><strong>Fax:</strong> (801) 359-2453</p>
                <p class="mb-1 font-crimson"><strong>Email:</strong> <a href="mailto:getinfo@dobbiniplaw.com" class="text-dobbin-green hover:underline">getinfo@dobbiniplaw.com</a></p>
              </div>
            </div>
          </div>
          
          <!-- Schedule Strategy Session Form -->
          <h2 class="text-2xl font-bold mb-6 text-dobbin-dark-green font-crimson">Schedule a Free 30 Minute Strategy Session</h2>
          <p class="text-left text-gray-600 mb-8 font-crimson">
            <span class="font-bold">
              Protect your valuable ideas with a complimentary 30-minute strategy session.
            </span>
            <br />
              Meet with our lawyer, Geoff — in person, by phone, or over Zoom. No obligation, just expert guidance on your best next steps.
          </p>
          
          <!-- Netlify Form with HTML-only implementation -->
          <form 
            name="contact-form" 
            method="POST" 
            data-netlify="true" 
            netlify-honeypot="bot-field"
          >
            <!-- Hidden fields for Netlify -->
            <input type="hidden" name="form-name" value="contact-form" />
            <p class="hidden">
              <label>Don't fill this out if you're human: <input name="bot-field" /></label>
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block mb-1 font-crimson text-gray-700">Your Name</label>
                <input
                  type="text"
                  name="name"
                  class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson bg-gray-100"
                  required
                />
              </div>
              
              <div>
                <label class="block mb-1 font-crimson text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson bg-gray-100"
                  required
                />
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block mb-1 font-crimson text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Does your question regard patents, trademarks or copyrights?"
                class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson bg-gray-100"
                required
              />
            </div>
            
            <div class="mb-4">
              <label class="block mb-1 font-crimson text-gray-700">Message</label>
              <textarea
                name="message"
                class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson bg-gray-100"
                rows="5"
                required
              ></textarea>
            </div>
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <label class="mr-2 font-crimson">9 + 12 = </label>
                <input
                  type="text"
                  name="human-check"
                  class="w-16 px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson bg-gray-100"
                  required
                  id="human-check"
                />
              </div>
              
              <button
                type="submit"
                class="bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white font-bold py-2 px-6 border border-dobbin-dark-green rounded-md transition-colors duration-200 font-crimson"
              >
                Submit
              </button>
            </div>
          </form>
          
          <!-- Google Maps Embed -->
          <div class="w-full h-80 border border-gray-300 mt-8">
            <iframe 
              class="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6575319155647!2d-111.9405988853505!3d40.73315967932904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8752f4df3fb976d1%3A0xbf52c6e9c3b8ee52!2s2250%20S%20Redwood%20Rd%20%235%2C%20West%20Valley%20City%2C%20UT%2084119!5e0!3m2!1sen!2sus!4v1681353175281!5m2!1sen!2sus"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Replace the old useHead with enhanced SEO
useSEO({
  title: 'Contact Us',
  description: 'Contact Dobbin IP Law in West Valley City, UT for a free 30-minute strategy session. Expert patent, trademark, and copyright legal services. Call (801) 969-6609.',
  path: '/contact/',
  keywords: 'contact IP lawyer, patent attorney Utah, trademark lawyer West Valley City, copyright attorney, intellectual property consultation, free legal consultation'
})

// ✅ ADD: Import the structured data function
const { useStructuredData } = await import('~/composables/useSEO.js')

// Add structured data for contact page
useStructuredData({
  "@type": ["LocalBusiness", "LegalService", "ContactPage"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+18019696609",
    "contactType": "customer service",
    "email": "getinfo@dobbiniplaw.com",
    "availableLanguage": "English",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:30",
      "closes": "17:30"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Free Consultation",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free 30-Minute Strategy Session",
          "description": "Complimentary consultation with intellectual property attorney"
        },
        "price": "0",
        "priceCurrency": "USD"
      }
    ]
  }
})

// Client-side validation for the human check
onMounted(() => {
  const form = document.querySelector('form[name="contact-form"]');
  if (form) {
    form.addEventListener('submit', (event) => {
      const humanCheck = document.getElementById('human-check');
      if (humanCheck && humanCheck.value !== '21') {
        event.preventDefault();
        alert('Incorrect answer. Please try again.');
      }
    });
  }
});
</script>

<style scoped>
.contact-page {
  max-width: 100%;
}

.hidden {
  display: none;
}
</style>