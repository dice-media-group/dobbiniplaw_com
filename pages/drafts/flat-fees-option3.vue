<template>
  <div>
    <HeroBanner title="Flat Fee Schedule">
      <p class="font-crimson text-white">
        Explore our transparent pricing and use our interactive calculator to estimate your IP service costs.
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
        
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 class="text-2xl font-bold mb-4">Fee Calculator</h2>
          <p class="mb-4">Use this calculator to estimate costs for your IP services:</p>
          
          <div class="mb-4">
            <label class="block mb-2 font-medium">Select Service Category:</label>
            <select 
              v-model="selectedCategory" 
              class="w-full p-2 border rounded"
              @change="resetOptions"
            >
              <option value="">-- Select Category --</option>
              <option value="design">Design Patents</option>
              <option value="trademarks">Trademarks</option>
              <option value="copyrights">Copyrights</option>
              <option value="maintenance">Maintenance</option>
              <option value="utah">Utah Corporate/LLC</option>
            </select>
          </div>
          
          <div v-if="selectedCategory" class="mb-4">
            <label class="block mb-2 font-medium">Select Service:</label>
            <select v-model="selectedService" class="w-full p-2 border rounded">
              <option value="">-- Select Service --</option>
              <option 
                v-for="(service, index) in serviceOptions" 
                :key="index" 
                :value="service.id"
              >
                {{ service.name }}
              </option>
            </select>
          </div>
          
          <div v-if="selectedService && selectedCategory === 'trademarks'" class="mb-4">
            <label class="block mb-2 font-medium">Number of Classes:</label>
            <select v-model="numClasses" class="w-full p-2 border rounded">
              <option value="1">1 Class</option>
              <option value="2">2 Classes</option>
              <option value="3">3 Classes</option>
              <option value="4">4 Classes</option>
              <option value="5">5 Classes</option>
            </select>
          </div>
          
          <div v-if="selectedService && selectedCategory === 'design'" class="mb-4">
            <label class="block mb-2 font-medium">Entity Size:</label>
            <select v-model="entitySize" class="w-full p-2 border rounded">
              <option value="regular">Regular Entity</option>
              <option value="small">Small Entity (60% reduction)</option>
              <option value="micro">Micro Entity (80% reduction)</option>
            </select>
          </div>
          
          <div v-if="selectedService && calculatedFee > 0" class="mt-6 p-4 bg-white border rounded-lg">
            <h3 class="text-xl font-bold mb-2">Estimated Fee:</h3>
            <p class="text-2xl font-bold text-blue-900">${{ calculatedFee.toLocaleString() }}</p>
            <p class="text-sm mt-2 text-gray-600">
              This is an estimate based on current rates. Additional fees may apply. 
              Please contact us for a detailed consultation.
            </p>
          </div>
        </div>
        
        <p class="mb-6">
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
        
        <p class="mb-6">
          Patentability searches will range from $1320 - $2310 and will have a
          comprehensive opinion based upon the search results. Usually, patent
          searches are completed by a professional searcher who will charge a fee.
          After receiving the results, Geoff will perform an in-depth analysis and
          give an opinion based on the search provided. In these cases, the fee is
          included in the projections listed above.
        </p>
        
        <p class="mb-8">
          Prosecution (interacting with the USPTO to advance an application) and
          litigation, which would include cases in local or Federal court, the
          Patent Trial and Appeal Board (PTAB), and the Trademark Trial and Appeal
          Board (TTAB), are inherently complex matters. They are dependent upon
          the actions and decisions of another party beyond your (or our) control.
          It is impossible to determine a fixed fee for anything substantially
          involving another party.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Design Patents Column -->
          <div>
            <h2 class="text-2xl font-bold mb-4">Design Patents</h2>
            <div class="bg-white p-4 border rounded-lg">
              <div class="font-semibold mb-2">Design Patent Application (up to 12 figures)</div>
              <div class="text-lg font-bold">$480</div>
              <div class="text-sm mb-2">+ USPTO fees<sup>1</sup> + Draftsman's fees</div>
              <ul class="list-disc pl-5 text-sm">
                <li>Preparing and filing of application</li>
                <li>Communication with draftsman</li>
                <li>Drawing requirements education</li>
                <li>Additional drawings at $20/sheet</li>
              </ul>
            </div>
          </div>
          
          <!-- Trademarks Column -->
          <div>
            <h2 class="text-2xl font-bold mb-4">Trademarks</h2>
            <div class="bg-white p-4 border rounded-lg mb-4">
              <div class="font-semibold mb-2">Registration Application (1 mark, 1 class)</div>
              <div class="text-lg font-bold">$830</div>
              <ul class="list-disc pl-5 text-sm">
                <li>Filing application and specimens</li>
                <li>USPTO filing fee ($350/class)</li>
                <li>USPTO point of contact</li>
                <li>Additional classes: $450 each</li>
              </ul>
            </div>
            
            <div class="bg-white p-4 border rounded-lg">
              <div class="font-semibold mb-2">Free-text class definition</div>
              <div class="text-lg font-bold">$1,050</div>
              <ul class="list-disc pl-5 text-sm">
                <li>Includes USPTO filing surcharge</li>
                <li>Additional classes: $625 each</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <!-- Copyrights Column -->
          <div>
            <h2 class="text-2xl font-bold mb-4">Copyrights</h2>
            <div class="bg-white p-4 border rounded-lg mb-4">
              <div class="font-semibold mb-2">Registration (1 author, 1 work)</div>
              <div class="text-lg font-bold">$205</div>
              <ul class="list-disc pl-5 text-sm">
                <li>Preparing and filing application</li>
                <li>Filing fee ($45)</li>
                <li>Client education</li>
              </ul>
            </div>
            
            <div class="bg-white p-4 border rounded-lg mb-4">
              <div class="font-semibold mb-2">Standard form</div>
              <div class="text-lg font-bold">$225</div>
              <div class="text-sm">Includes $65 filing fee</div>
            </div>
            
            <div class="bg-white p-4 border rounded-lg">
              <div class="font-semibold mb-2">Group form (up to 10 works)</div>
              <div class="text-lg font-bold">$310</div>
              <div class="text-sm">Includes $85 filing fee</div>
            </div>
          </div>
          
          <!-- Maintenance Column -->
          <div>
            <h2 class="text-2xl font-bold mb-4">Maintenance</h2>
            <div class="bg-white p-4 border rounded-lg mb-4">
              <div class="font-semibold mb-2">Patent maintenance fees</div>
              <div class="text-lg font-bold">$160</div>
              <div class="text-sm">+ USPTO fees</div>
            </div>
            
            <div class="bg-white p-4 border rounded-lg mb-4">
              <div class="font-semibold mb-2">§8 Trademark Maintenance</div>
              <div class="text-lg font-bold">$460</div>
              <div class="text-sm">Includes $300 USPTO fee</div>
            </div>
            
            <div class="bg-white p-4 border rounded-lg">
              <div class="font-semibold mb-2">§9 Renewal and §8 Maintenance</div>
              <div class="text-lg font-bold">$970</div>
              <div class="text-sm">Includes $650 USPTO fee</div>
            </div>
          </div>
        </div>
        
        <div class="mt-8">
          <h2 class="text-2xl font-bold mb-4">Utah Corporate/LLC Formation</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white p-4 border rounded-lg">
              <div class="font-semibold mb-2">Corporate/LLC formation (Utah only)</div>
              <div class="text-lg font-bold">$400</div>
              <ul class="list-disc pl-5 text-sm">
                <li>$59 state fees for domestic entities</li>
                <li>Basic organizing documents</li>
                <li>EIN and IRS elections</li>
              </ul>
            </div>
            
            <div class="bg-white p-4 border rounded-lg">
              <div class="font-semibold mb-2">Corporate/LLC renewal</div>
              <div class="text-lg font-bold">$60</div>
              <div class="text-sm">Includes $18 Utah renewal fee</div>
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
</template>

<script setup>
import HeroBanner from '../../components/HeroBanner.vue';
import PageCTA from '../../components/PageCTA.vue';
import { ref, computed } from 'vue';

// State variables
const selectedCategory = ref('');
const selectedService = ref('');
const numClasses = ref(1);
const entitySize = ref('small');

// Fee data
const feeData = {
  design: [
    { id: 'design-patent', name: 'Design Patent Application (up to 12 figures)', baseFee: 480, usptpFees: { regular: 760, small: 380, micro: 190 } }
  ],
  trademarks: [
    { id: 'tm-reg', name: 'Trademark Registration Application (1 mark)', baseFee: 830, additionalClassFee: 450 },
    { id: 'tm-freetext', name: 'Trademark Registration with Free-text Class', baseFee: 1050, additionalClassFee: 625 },
    { id: 'tm-sou', name: 'File Statement of Use', baseFee: 310, additionalClassFee: 200 },
    { id: 'tm-extension', name: 'File Extension of Time', baseFee: 285, additionalClassFee: 175 }
  ],
  copyrights: [
    { id: 'copyright-single', name: 'Copyright Registration (1 author, 1 work)', baseFee: 205 },
    { id: 'copyright-standard', name: 'Copyright Registration (standard form)', baseFee: 225 },
    { id: 'copyright-group', name: 'Copyright Registration (group form)', baseFee: 310 }
  ],
  maintenance: [
    { id: 'patent-maintenance', name: 'Patent Maintenance Fee', baseFee: 160 },
    { id: 'tm-8-maintenance', name: '§8 Trademark Maintenance', baseFee: 460, additionalClassFee: 380 },
    { id: 'tm-9-renewal', name: '§9 Renewal and §8 Maintenance', baseFee: 970, additionalClassFee: 700 }
  ],
  utah: [
    { id: 'llc-formation', name: 'Corporate/LLC Formation (Utah)', baseFee: 400 },
    { id: 'llc-renewal', name: 'Corporate/LLC Renewal', baseFee: 60 }
  ]
};

// Computed properties
const serviceOptions = computed(() => {
  if (!selectedCategory.value) return [];
  return feeData[selectedCategory.value] || [];
});

const calculatedFee = computed(() => {
  if (!selectedCategory.value || !selectedService.value) return 0;
  
  const category = feeData[selectedCategory.value];
  if (!category) return 0;
  
  const service = category.find(s => s.id === selectedService.value);
  if (!service) return 0;
  
  let total = service.baseFee;
  
  // Add USPTO fees for design patents
  if (selectedCategory.value === 'design' && service.usptpFees) {
    total += service.usptpFees[entitySize.value] || 0;
    // Estimate draftsman fees (rough estimate)
    total += 300; // Assuming around 6 sheets at $50 each
  }
  
  // Add fees for additional trademark classes
  if ((selectedCategory.value === 'trademarks' || 
      (selectedCategory.value === 'maintenance' && 
       (selectedService.value === 'tm-8-maintenance' || selectedService.value === 'tm-9-renewal'))) && 
      service.additionalClassFee && numClasses.value > 1) {
    total += service.additionalClassFee * (numClasses.value - 1);
  }
  
  return total;
});

// Methods
const resetOptions = () => {
  selectedService.value = '';
  numClasses.value = 1;
  entitySize.value = 'small';
};

useHead({
  title: 'Flat Fee Schedule | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Explore our transparent pricing and use our interactive calculator to estimate your IP service costs.' }
  ]
});
</script>

<style scoped>
.prose ul li {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
</style>