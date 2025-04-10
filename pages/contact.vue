<template>
  <div class="contact-page">
    <!-- Header Section -->
    <section class="bg-dobbin-dark-green text-white py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold mb-4 font-crimson">Schedule a Strategy Session</h1>
        <p class="mb-2 font-crimson">We are committed to continue serving you in these trying times. We are still open for business and will be using telephonic and video calls.</p>
      </div>
    </section>
    
    <!-- Contact Form Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-xl font-bold mb-4 text-dobbin-dark-green font-crimson">Contact Information</h2>
              <div class="mb-6">
                <p class="mb-2 font-crimson"><strong>Phone:</strong> (801) 969-6609</p>
                <p class="mb-2 font-crimson"><strong>Fax:</strong> (801) 359-2551</p>
                <p class="mb-2 font-crimson"><strong>Email:</strong> <a href="mailto:getinfo@dobbiniplaw.com" class="text-dobbin-green hover:underline">getinfo@dobbiniplaw.com</a></p>
              </div>
              
              <h2 class="text-xl font-bold mb-4 text-dobbin-dark-green font-crimson">Office Address</h2>
              <div class="mb-6">
                <p class="mb-1 font-crimson">Dobbin IP Law P.C.</p>
                <p class="mb-1 font-crimson">2290 E Richmond Rd, Suite 3</p>
                <p class="font-crimson">West Valley City, UT 84106</p>
              </div>
              
              <h2 class="text-xl font-bold mb-4 text-dobbin-dark-green font-crimson">Office Hours</h2>
              <div>
                <p class="mb-1 font-crimson">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p class="font-crimson">Saturday - Sunday: Closed</p>
              </div>
            </div>
            
            <div>
              <h2 class="text-xl font-bold mb-4 text-dobbin-dark-green font-crimson">Schedule a Complementary Strategy Session</h2>
              <form @submit.prevent="submitForm" class="contact-form">
                <div class="mb-4">
                  <label for="name" class="block text-gray-700 mb-1 font-crimson">Name *</label>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson"
                    required
                  />
                </div>
                
                <div class="mb-4">
                  <label for="email" class="block text-gray-700 mb-1 font-crimson">Email *</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson"
                    required
                  />
                </div>
                
                <div class="mb-4">
                  <label for="phone" class="block text-gray-700 mb-1 font-crimson">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="form.phone"
                    class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson"
                    required
                  />
                </div>
                
                <div class="mb-4">
                  <label for="service" class="block text-gray-700 mb-1 font-crimson">Service Interested In</label>
                  <select
                    id="service"
                    v-model="form.service"
                    class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson"
                  >
                    <option value="">Select a service</option>
                    <option value="patents">Patents</option>
                    <option value="trademarks">Trademarks</option>
                    <option value="copyrights">Copyrights</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div class="mb-4">
                  <label for="message" class="block text-gray-700 mb-1 font-crimson">Message *</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson"
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  class="bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white font-bold py-2 px-6 border border-dobbin-dark-green rounded-md transition-colors duration-200 font-crimson"
                  :disabled="submitting"
                >
                  {{ submitting ? 'Sending...' : 'Submit' }}
                </button>
                
                <div v-if="formSuccess" class="mt-4 p-3 bg-green-100 text-green-700 font-crimson">
                  Your message has been sent successfully! We'll get back to you shortly.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Schedule Strategy Session | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Contact Dobbin IP Law for a complementary strategy session about your patent, trademark, and copyright needs.' }
  ]
})

const form = ref({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
});

const submitting = ref(false);
const formSuccess = ref(false);

const submitForm = async () => {
  submitting.value = true;
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real application, you'd make an API call here
  console.log('Form submitted:', form.value);
  
  // Reset form
  form.value = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };
  
  submitting.value = false;
  formSuccess.value = true;
  
  // Reset success message after 5 seconds
  setTimeout(() => {
    formSuccess.value = false;
  }, 5000);
};
</script>

<style scoped>
.contact-page {
  max-width: 100%;
}
</style>