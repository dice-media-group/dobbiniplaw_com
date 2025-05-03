<template>
  <div>
    <HeroBanner title="Flat Fee Schedule">
      <p class="font-crimson text-white">
        Our transparent flat fee pricing structure helps you understand costs upfront for intellectual property services.
      </p>
    </HeroBanner>
    
    <div class="container mx-auto px-4 max-w-6xl py-8">
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
          <div class="border rounded-lg overflow-hidden mb-6">
            <div 
              class="bg-blue-100 px-4 py-3 flex justify-between items-center cursor-pointer"
              @click="toggleSection('utility')"
            >
              <h3 class="text-xl font-semibold">Utility Patent Notes</h3>
              <span class="text-2xl">
                {{ openSections.utility ? '−' : '+' }}
              </span>
            </div>
            <div v-if="openSections.utility" class="px-4 py-3 bg-white">
              <p class="mb-4">
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
              
              <p class="mb-4">
                Patentability searches will range from $1320 - $2310 and will have a
                comprehensive opinion based upon the search results. Usually, patent
                searches are completed by a professional searcher who will charge a fee.
                After receiving the results, Geoff will perform an in-depth analysis and
                give an opinion based on the search provided. In these cases, the fee is
                included in the projections listed above.
              </p>
              
              <p>
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
          
          <!-- Design Patents Section -->
          <div class="border rounded-lg overflow-hidden mb-6">
            <div 
              class="bg-blue-100 px-4 py-3 flex justify-between items-center cursor-pointer"
              @click="toggleSection('design')"
            >
              <h3 class="text-xl font-semibold">Design Patents</h3>
              <span class="text-2xl">
                {{ openSections.design ? '−' : '+' }}
              </span>
            </div>
            <div v-if="openSections.design" class="px-4 py-3 bg-white">
              <div class="flex flex-col md:flex-row border-b py-4">
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Design Patent Application: includes up to 12 figures
                </div>
                <div class="md:w-2/3">
                  <p>$480 + USPTO fees<sup>1</sup> + Draftsman's fees (usually $50-60 a sheet), includes:</p>
                  <ul class="list-disc pl-5 mt-2">
                    <li>Preparing and filing of application;</li>
                    <li>Communication with draftsman to create drawings;</li>
                    <li>Alternatively, education and explanation of drawing requirements to client</li>
                    <li>Add'l drawings included at $20/sheet.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Trademarks Section -->
          <div class="border rounded-lg overflow-hidden mb-6">
            <div 
              class="bg-blue-100 px-4 py-3 flex justify-between items-center cursor-pointer"
              @click="toggleSection('trademarks')"
            >
              <h3 class="text-xl font-semibold">Trademarks</h3>
              <span class="text-2xl">
                {{ openSections.trademarks ? '−' : '+' }}
              </span>
            </div>
            <div v-if="openSections.trademarks" class="px-4 py-3 bg-white">
              <!-- 1st item -->
              <div class="flex flex-col md:flex-row border-b py-4">
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Trademark Registration Application: 1 mark, 1 class
                </div>
                <div class="md:w-2/3">
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
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Trademark Registration Application, free-text class definition, 1 mark, 1 class
                </div>
                <div class="md:w-2/3">
                  <p>$1050, as above except:</p>
                  <ul class="list-disc pl-5 mt-2">
                    <li>Includes USPTO Filing surcharge (+$200/class, $550 total);</li>
                    <li>Add'l classes: $625.</li>
                  </ul>
                </div>
              </div>
              
              <!-- 3rd item -->
              <div class="flex flex-col md:flex-row border-b py-4">
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  File Statement of Use
                </div>
                <div class="md:w-2/3">
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
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  File Extension of time to file Statement of Use
                </div>
                <div class="md:w-2/3">
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
          
          <!-- Copyrights Section -->
          <div class="border rounded-lg overflow-hidden mb-6">
            <div 
              class="bg-blue-100 px-4 py-3 flex justify-between items-center cursor-pointer"
              @click="toggleSection('copyrights')"
            >
              <h3 class="text-xl font-semibold">Copyrights</h3>
              <span class="text-2xl">
                {{ openSections.copyrights ? '−' : '+' }}
              </span>
            </div>
            <div v-if="openSections.copyrights" class="px-4 py-3 bg-white">
              <!-- 1st item -->
              <div class="flex flex-col md:flex-row border-b py-4">
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Copyright Registration Application -- 1 author and 1 work
                </div>
                <div class="md:w-2/3">
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
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Copyright Registration Application -- standard form
                </div>
                <div class="md:w-2/3">
                  <p>$225 Includes:</p>
                  <ul class="list-disc pl-5 mt-2">
                    <li>As above except:</li>
                    <li>Filing fee ($65).</li>
                  </ul>
                </div>
              </div>
              
              <!-- 3rd item -->
              <div class="flex flex-col md:flex-row py-4">
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Copyright Registration Application -- group form
                </div>
                <div class="md:w-2/3">
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
          
          <!-- Maintenance Section -->
          <div class="border rounded-lg overflow-hidden mb-6">
            <div 
              class="bg-blue-100 px-4 py-3 flex justify-between items-center cursor-pointer"
              @click="toggleSection('maintenance')"
            >
              <h3 class="text-xl font-semibold">Maintenance</h3>
              <span class="text-2xl">
                {{ openSections.maintenance ? '−' : '+' }}
              </span>
            </div>
            <div v-if="openSections.maintenance" class="px-4 py-3 bg-white">
              <div class="flex flex-col md:flex-row border-b py-4">
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Issue Fee or Maintenance Fee filings for Patents
                </div>
                <div class="md:w-2/3">
                  <p>$160 + USPTO Fees (does not include transaction fees)</p>
                </div>
              </div>
              
              <!-- 2nd item -->
              <div class="flex flex-col md:flex-row border-b py-4">
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Filing §8 Maintenance for TMs
                </div>
                <div class="md:w-2/3">
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
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Filing §9 Renewal and §8 Maintenance
                </div>
                <div class="md:w-2/3">
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
          
          <!-- Utah Corporate/LLC Formation Section -->
          <div class="border rounded-lg overflow-hidden mb-6">
            <div 
              class="bg-blue-100 px-4 py-3 flex justify-between items-center cursor-pointer"
              @click="toggleSection('utah')"
            >
              <h3 class="text-xl font-semibold">Utah Corporate/LLC Formation</h3>
              <span class="text-2xl">
                {{ openSections.utah ? '−' : '+' }}
              </span>
            </div>
            <div v-if="openSections.utah" class="px-4 py-3 bg-white">
              <!-- 1st item -->
              <div class="flex flex-col md:flex-row border-b py-4">
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Corporate/LLC formation (Utah only)
                </div>
                <div class="md:w-2/3">
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
                <div class="md:w-1/3 font-semibold mb-2 md:mb-0">
                  Corporate/LLC renewal
                </div>
                <div class="md:w-2/3">
                  <p>$60, includes $18 Utah Renewal fee.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-sm mt-8">
            <p><sup>1</sup> USPTO patent fees are based upon entity size. Most of you will be
            small entities (with a 60% reduction in USPTO fees) or micro
            entities (with an 80% discount).</p>
          </div>
          
          <PageCTA />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeroBanner from '../../components/HeroBanner.vue';
import PageCTA from '../../components/PageCTA.vue';
import { ref } from 'vue';

// State to manage which sections are open
const openSections = ref({
  utility: true,  // Start with this section open
  design: false,
  trademarks: false,
  copyrights: false,
  maintenance: false,
  utah: false
});

// Toggle section visibility
const toggleSection = (section) => {
  openSections.value[section] = !openSections.value[section];
};

useHead({
  title: 'Flat Fee Schedule | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Our transparent flat fee pricing for intellectual property services including design patents, trademarks, copyrights, and more.' }
  ]
})
</script>

<style scoped>
.prose ul li {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

/* Smooth transition for accordion */
[v-cloak] {
  display: none;
}
</style>