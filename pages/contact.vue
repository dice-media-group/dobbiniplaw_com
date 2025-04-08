<template>
  <div class="contact-page">
    <!-- Header Section -->
    <section class="bg-dobbin-green text-white py-6">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold mb-4">Schedule a Strategy Session</h1>
        <p class="mb-2">We are committed to continue serving you in these trying times. We are still open for business and will be using telephonic and video calls.</p>
      </div>
    </section>
    
    <!-- Contact Form Section -->
    <section class="py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 class="text-xl font-bold mb-4 text-gray-800">Contact Information</h2>
              <div class="mb-6">
                <p class="mb-2"><strong>Phone:</strong> (801) 969-6609</p>
                <p class="mb-2"><strong>Fax:</strong> (801) 359-2551</p>
                <p class="mb-2"><strong>Email:</strong> <a href="mailto:getinfo@dobbiniplaw.com" class="text-dobbin-green hover:underline">getinfo@dobbiniplaw.com</a></p>
              </div>
              
              <h2 class="text-xl font-bold mb-4 text-gray-800">Office Address</h2>
              <div class="mb-6">
                <p class="mb-1">Dobbin IP Law P.C.</p>
                <p class="mb-1">2290 E Richmond Rd, Suite 3</p>
                <p>West Valley City, UT 84106</p>
              </div>
              
              <h2 class="text-xl font-bold mb-4 text-gray-800">Office Hours</h2>
              <div>
                <p class="mb-1">Monday - Friday: 9:00 AM - 5:00 PM</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>
            
            <div>
              <h2 class="text-xl font-bold mb-4 text-gray-800">Schedule a Complementary Strategy Session</h2>
              <form @submit.prevent="submitForm" class="contact-form">
                <div class="mb-4">
                  <label for="name" class="block text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green"
                    required
                  />
                </div>
                
                <div class="mb-4">
                  <label for="email" class="block text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    id="email"
                    v-model="form.email"
                    class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green"
                    required
                  />
                </div>
                
                <div class="mb-4">
                  <label for="phone" class="block text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="form.phone"
                    class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green"
                    required
                  />
                </div>
                
                <div class="mb-4">
                  <label for="service" class="block text-gray-700 mb-1">Service Interested In</label>
                  <select
                    id="service"
                    v-model="form.service"
                    class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green"
                  >
                    <option value="">Select a service</option>
                    <option value="patents">Patents</option>
                    <option value="trademarks">Trademarks</option>
                    <option value="copyrights">Copyrights</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div class="mb-4">
                  <label for="message" class="block text-gray-700 mb-1">Message *</label>
                  <textarea
                    id="message"
                    v-model="form.message"
                    class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green"
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  class="bg-dobbin-green hover:bg-green-900 text-white font-bold py-2 px-6 transition duration-200"
                  :disabled="submitting"
                >
                  {{ submitting ? 'Sending...' : 'Submit' }}
                </button>
                
                <div v-if="formSuccess" class="mt-4 p-3 bg-green-100 text-green-700">
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