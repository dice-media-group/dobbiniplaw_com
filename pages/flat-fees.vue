<template>
  <div>
    <HeroBanner title="Flat Fee Schedule" titleTag="h2">
      <p class="font-crimson text-white">
        Our transparent flat fee pricing structure helps you understand costs upfront for intellectual property services.
      </p>
    </HeroBanner>
    
    <!-- Add the actual H1 for the page in the main content -->
    <section class="py-8 circuit-board-bg">
      <div class="container mx-auto px-4 max-w-6xl">
        <h1 class="sr-only">Flat Fee Schedule for Intellectual Property Services</h1>
        <div class="prose prose-lg max-w-none">
          <p class="mb-6">
            We offer the following flat fee services, based upon Geoff's prepayment
            rate and current fees at the USPTO, Copyright Office, or State of Utah.
            The quoted rate will include all support services from Chris and the
            appropriate official fees where indicated. These rates are subject to
            change based upon the filing fees charged by the listed government
            entities.
          </p>
          
          <p class="mb-6">
            These flat fees <span class="font-bold underline">do not include</span> Utility Patent
            Applications, Patent Prosecution (including prosecution of design
            patents), Searches, or Litigation.
          </p>
          
          <div class="my-8">
            <!-- Utility Patent Note Section -->
            <div class="mb-4 border-b border-gray-200">
              <button 
                class="w-full text-left py-4 px-6 font-bold flex justify-between items-center focus:outline-none bg-white font-crimson"
                @click="toggleSection('utility')"
              >
                <span>Utility Patent Notes</span>
                <span v-if="openSections.utility" class="transform transition-transform">−</span>
                <span v-else class="transform transition-transform">+</span>
              </button>
              
              <div 
                class="bg-white overflow-hidden transition-max-height"
                :style="getSectionStyle('utility')"
              >
                <div class="py-4 px-6" :id="`section-utility`" ref="sectionUtility">
                  <p class="mb-4 font-crimson">
                    Utility Non-provisional and Provisional Applications will be billed on
                    an hourly basis, with provisional applications being considered a first
                    step of a non-provisional "project." Average patent application projects
                    will fall in the range of $3200 - $4800 (10-15 hours at Geoff's
                    discounted rate) plus USPTO fees and drawings. For comparison, an
                    average patent "project" will range between 6 to 12 pages of
                    Specification, up to 20 claims, and 6 to 8 drawing sheets. This cost is
                    just for filing the application -- dealing with rejections (which is
                    normal and is called prosecution) is another matter.
                  </p>
                  
                  <p class="mb-4 font-crimson">
                    Patentability searches will range from $1320 - $2310 and will have a
                    comprehensive opinion based upon the search results. Usually, patent
                    searches are completed by a professional searcher who will charge a fee.
                    After receiving the results, Geoff will perform an in-depth analysis and
                    give an opinion based on the search provided. In these cases, the fee is
                    included in the projections listed above.
                  </p>
                  
                  <p class="font-crimson">
                    Prosecution (interacting with the USPTO to advance an application) and
                    litigation, which would include cases in local or Federal court, the
                    Patent Trial and Appeal Board (PTAB), and the Trademark Trial and Appeal
                    Board (TTAB), are inherently complex matters. They are dependent upon
                    the actions and decisions of another party beyond your (or our) control.
                    It is impossible to determine a fixed fee for anything substantially
                    involving another party.
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Design Patents Section -->
            <div class="mb-4 border-b border-gray-200">
              <button 
                class="w-full text-left py-4 px-6 font-bold flex justify-between items-center focus:outline-none bg-white font-crimson"
                @click="toggleSection('design')"
              >
                <span>Design Patents</span>
                <span v-if="openSections.design" class="transform transition-transform">−</span>
                <span v-else class="transform transition-transform">+</span>
              </button>
              
              <div 
                class="bg-white overflow-hidden transition-max-height"
                :style="getSectionStyle('design')"
              >
                <div class="py-4 px-6" :id="`section-design`" ref="sectionDesign">
                  <div class="flex flex-col md:flex-row border-b py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Design Patent Application: includes up to 12 figures
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$480 + USPTO fees<sup>1</sup> + Draftsman's fees (usually $50-60 a sheet), includes:</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>Preparing and filing of application;</li>
                        <li>Communication with draftsman to create drawings;</li>
                        <li>Alternatively, education and explanation of drawing requirements to client</li>
                        <li>Additional drawings included at $30/sheet plus draftsman's fees.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Trademarks Section -->
            <div class="mb-4 border-b border-gray-200">
              <button 
                class="w-full text-left py-4 px-6 font-bold flex justify-between items-center focus:outline-none bg-white font-crimson"
                @click="toggleSection('trademarks')"
              >
                <span>Trademarks</span>
                <span v-if="openSections.trademarks" class="transform transition-transform">−</span>
                <span v-else class="transform transition-transform">+</span>
              </button>
              
              <div 
                class="bg-white overflow-hidden transition-max-height"
                :style="getSectionStyle('trademarks')"
              >
                <div class="py-4 px-6" :id="`section-trademarks`" ref="sectionTrademarks">
                  <!-- 1st item -->
                  <div class="flex flex-col md:flex-row border-b py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Trademark Registration Application: 1 mark, 1 class
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$830, includes:</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>Preparing and filing Application and Specimens;</li>
                        <li>USPTO Filing Fee ($350/class);</li>
                        <li>Point of contact for USPTO;</li>
                        <li>Application tracking and reporting;</li>
                        <li>Office action responses up to 1 hour;</li>
                        <li>Maintenance tracking after registration;</li>
                        <li>File 3 mo. extension of time, as needed, at cost ($125);</li>
                        <li>Add'l classes: $450.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <!-- 2nd item -->
                  <div class="flex flex-col md:flex-row border-b py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Trademark Registration Application, free-text class definition, 1 mark, 1 class
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$1050, as above except:</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>Includes USPTO Filing surcharge (+$200/class, $550 total);</li>
                        <li>Add'l classes: $625.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <!-- 3rd item -->
                  <div class="flex flex-col md:flex-row border-b py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      File Statement of Use
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$310 1<sup>st</sup> class includes:</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>SOU fee ($150);</li>
                        <li>Filing SOU and preparing specimens;</li>
                        <li>Client education and support regarding use;</li>
                        <li>Additional docketing;</li>
                        <li>Add'l classes: $200 each.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <!-- 4th item -->
                  <div class="flex flex-col md:flex-row py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      File Extension of time to file Statement of Use
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$285 Includes:</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>Extension of time fee ($125);</li>
                        <li>Filing extension of time;</li>
                        <li>Client education and support regarding use;</li>
                        <li>Additional docketing;</li>
                        <li>Add'l classes: $175 each.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Copyrights Section -->
            <div class="mb-4 border-b border-gray-200">
              <button 
                class="w-full text-left py-4 px-6 font-bold flex justify-between items-center focus:outline-none bg-white font-crimson"
                @click="toggleSection('copyrights')"
              >
                <span>Copyrights</span>
                <span v-if="openSections.copyrights" class="transform transition-transform">−</span>
                <span v-else class="transform transition-transform">+</span>
              </button>
              
              <div 
                class="bg-white overflow-hidden transition-max-height"
                :style="getSectionStyle('copyrights')"
              >
                <div class="py-4 px-6" :id="`section-copyrights`" ref="sectionCopyrights">
                  <!-- 1st item -->
                  <div class="flex flex-col md:flex-row border-b py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Copyright Registration Application -- 1 author and 1 work
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$205 Includes:</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>Preparing and filing application;</li>
                        <li>Client education;</li>
                        <li>Filing fee ($45);</li>
                        <li>Point of contact for U.S. Copyright Office;</li>
                        <li>Application tracking and reporting;</li>
                        <li>Simple office action responses of less than 15 minutes.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <!-- 2nd item -->
                  <div class="flex flex-col md:flex-row border-b py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Copyright Registration Application -- standard form
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$225 Includes:</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>As above except:</li>
                        <li>Filing fee ($65).</li>
                      </ul>
                    </div>
                  </div>
                  
                  <!-- 3rd item -->
                  <div class="flex flex-col md:flex-row py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Copyright Registration Application -- group form
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$310 Includes:</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>As above except:</li>
                        <li>Preparing and filing application (up to 10 works);</li>
                        <li>Filing fee ($85).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Maintenance Section -->
            <div class="mb-4 border-b border-gray-200">
              <button 
                class="w-full text-left py-4 px-6 font-bold flex justify-between items-center focus:outline-none bg-white font-crimson"
                @click="toggleSection('maintenance')"
              >
                <span>Maintenance</span>
                <span v-if="openSections.maintenance" class="transform transition-transform">−</span>
                <span v-else class="transform transition-transform">+</span>
              </button>
              
              <div 
                class="bg-white overflow-hidden transition-max-height"
                :style="getSectionStyle('maintenance')"
              >
                <div class="py-4 px-6" :id="`section-maintenance`" ref="sectionMaintenance">
                  <div class="flex flex-col md:flex-row border-b py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Issue Fee or Maintenance Fee filings for Patents
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$160 + USPTO Fees (does not include transaction fees)</p>
                    </div>
                  </div>
                  
                  <!-- 2nd item -->
                  <div class="flex flex-col md:flex-row border-b py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Filing §8 Maintenance for TMs
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$460, includes</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>Preparing and filing Declaration and Specimens;</li>
                        <li>USPTO Filing Fee ($300);</li>
                        <li>Continued registration tracking and reporting and POC;</li>
                        <li>Add'l classes: $380;</li>
                        <li>Add'l §15 Declaration: $300 (includes $250 USPTO fee)/class.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <!-- 3rd item -->
                  <div class="flex flex-col md:flex-row py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Filing §9 Renewal and §8 Maintenance
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$970, includes</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>Preparing and filing Declaration, Application, and Specimens;</li>
                        <li>USPTO Filing Fee ($650);</li>
                        <li>Continued registration tracking and reporting and POC;</li>
                        <li>Add'l classes: $700;</li>
                        <li>Add'l §15 Declaration: $300 (includes $250 USPTO fee)/class.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Utah Corporate/LLC Formation Section -->
            <div class="mb-4 border-b border-gray-200">
              <button 
                class="w-full text-left py-4 px-6 font-bold flex justify-between items-center focus:outline-none bg-white font-crimson"
                @click="toggleSection('utah')"
              >
                <span>Utah Corporate/LLC Formation</span>
                <span v-if="openSections.utah" class="transform transition-transform">−</span>
                <span v-else class="transform transition-transform">+</span>
              </button>
              
              <div 
                class="bg-white overflow-hidden transition-max-height"
                :style="getSectionStyle('utah')"
              >
                <div class="py-4 px-6" :id="`section-utah`" ref="sectionUtah">
                  <!-- 1st item -->
                  <div class="flex flex-col md:flex-row border-b py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Corporate/LLC formation (Utah only)
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$400, includes:</p>
                      <ul class="list-disc pl-5 mt-2">
                        <li>$59 state fees for domestic entities;</li>
                        <li>Basic organizing documents, including bylaws or agreements;</li>
                        <li>EIN;</li>
                        <li>IRS elections (entity tax type, S-corp, etc.);</li>
                        <li>Education on sales tax and employment taxes.</li>
                      </ul>
                    </div>
                  </div>
                  
                  <!-- 2nd item -->
                  <div class="flex flex-col md:flex-row py-4">
                    <div class="md:w-1/3 font-semibold mb-2 md:mb-0 font-crimson">
                      Corporate/LLC renewal
                    </div>
                    <div class="md:w-2/3 font-crimson">
                      <p>$60, includes $18 Utah Renewal fee.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="text-sm mt-8">
              <p><sup>1</sup> USPTO patent fees are based upon entity size. Most of you will be
              small entities (with a 60% reduction in USPTO fees) or micro
              entities (with an 80% discount).</p>
            </div>
          </div>
        </div>
        
        <!-- Custom CTA section with consistent text coloring -->
        <section class="py-8 bg-dobbin-dark-green text-white">
          <div class="container mx-auto px-4 max-w-6xl">
            <div class="mx-auto text-center">
              <h2 class="text-2xl font-bold mb-4 font-crimson text-white">Ready to Protect Your Intellectual Property?</h2>
              <p class="mb-6 font-crimson text-white">
                Contact us today to schedule your complementary strategy session and see how we can help protect your inventions, copyrights, and trademarks.
              </p>
              <a href="/contact" class="inline-block bg-white text-dobbin-dark-green font-bold py-2 px-8 rounded hover:bg-gray-100 transition font-crimson">
                Schedule a Strategy Session
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, nextTick, defineAsyncComponent } from 'vue';

// Lazy load the components for better performance
const HeroBanner = defineAsyncComponent(() => import('../components/HeroBanner.vue'));

// Replace the old useHead with this new useSEO call
useSEO({
  title: 'Flat Fee Schedule',
  description: 'Our transparent flat fee pricing for intellectual property services including design patents, trademarks, copyrights, and more.',
  path: '/flat-fees',
  keywords: 'intellectual property fees, patent fees, trademark fees, copyright fees, flat fee schedule, IP law pricing'
})
// ✅ ADD: Import the structured data function
const { useStructuredData } = await import('~/composables/useSEO.js')


// Add structured data for this specific page
useStructuredData({
  // Add any page-specific schema data here
  "@type": ["LocalBusiness", "LegalService"],
  "priceRange": "$160-$1050",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Flat Fee IP Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Design Patent Application",
          "price": "$480"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Trademark Registration",
          "price": "$830"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Copyright Registration",
          "price": "$205"
        }
      }
    ]
  }
})

// State to manage which sections are open
const openSections = ref({
  utility: true,  // Start with this section open
  design: false,
  trademarks: false,
  copyrights: false,
  maintenance: false,
  utah: false
});

// Store section heights for animation
const sectionHeights = ref({});

// Toggle section visibility with animation
const toggleSection = async (section) => {
  // Toggle the section open/closed
  openSections.value[section] = !openSections.value[section];
  
  // If opening the section, measure its height after DOM update
  if (openSections.value[section]) {
    await nextTick();
    
    // Find the section content and measure its height
    const sectionId = `section-${section}`;
    const sectionEl = document.getElementById(sectionId);
    
    if (sectionEl) {
      // Store the height for animation
      sectionHeights.value[section] = sectionEl.scrollHeight;
    }
  }
};

// Get content style for each section based on whether it's active
const getSectionStyle = (section) => {
  if (openSections.value[section]) {
    // Get the height from our sectionHeights object if available, or use 'auto'
    return { 
      maxHeight: sectionHeights.value[section] ? `${sectionHeights.value[section]}px` : 'auto',
      opacity: 1
    };
  } else {
    return { 
      maxHeight: '0px',
      opacity: 0
    };
  }
};
</script>

<style scoped>
.prose ul li {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

/* Updated background for accordion section to use Circuit-Board.png */
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

/* FAQ animations to match PatentFAQ.vue */
.transition-max-height {
  transition: max-height 0.4s ease-in-out, opacity 0.4s ease-in-out;
}

/* Hide v-cloak elements until Vue is ready */
[v-cloak] {
  display: none;
}
</style>
