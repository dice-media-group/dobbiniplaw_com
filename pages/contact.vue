<template>
  <div class="contact-page">
    <!-- Header Section -->
    <section class="bg-dobbin-dark-green text-white py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-3xl font-bold mb-4 font-crimson">Contact Us</h1>
      </div>
    </section>
    
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
          <h2 class="text-2xl font-bold mb-6 text-dobbin-dark-green font-crimson">Schedule Strategy Session</h2>
          <form @submit.prevent="submitForm" class="contact-form mb-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  v-model="form.name"
                  class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson bg-gray-100"
                  required
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email Address"
                  v-model="form.email"
                  class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson bg-gray-100"
                  required
                />
              </div>
            </div>
            
            <div class="mb-4">
              <input
                type="text"
                placeholder="Does your question regard patents, trademarks or copyrights?"
                v-model="form.subject"
                class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson bg-gray-100"
                required
              />
            </div>
            
            <div class="mb-4">
              <textarea
                placeholder="Message"
                v-model="form.message"
                class="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson bg-gray-100"
                rows="5"
                required
              ></textarea>
            </div>
            
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center">
                <span class="mr-2 font-crimson">9 + 12 =</span>
                <input
                  type="text"
                  v-model="form.captcha"
                  class="w-16 px-3 py-2 border border-gray-300 focus:outline-none focus:border-dobbin-green font-crimson bg-gray-100"
                  required
                />
              </div>
              
              <button
                type="submit"
                class="bg-dobbin-bright-green hover:bg-dobbin-dark-green text-white font-bold py-2 px-6 border border-dobbin-dark-green rounded-md transition-colors duration-200 font-crimson"
                :disabled="submitting"
              >
                Submit
              </button>
            </div>
            
            <div v-if="formSuccess" class="mt-4 p-3 bg-green-100 text-green-700 font-crimson">
              Your message has been sent successfully! We'll get back to you shortly.
            </div>
            
            <div v-if="formError" class="mt-4 p-3 bg-red-100 text-red-700 font-crimson">
              {{ formError }}
            </div>
          </form>
          
          <!-- Google Maps Embed -->
          <div class="w-full h-80 border border-gray-300">
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
    
    <!-- Disclaimer Section -->
    <section class="bg-dobbin-dark-green text-white py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <div class="mb-6">
            <p class="mb-1 font-crimson">Dobbin IP Law P.C.</p>
            <p class="mb-1 font-crimson">2250 S Redwood Rd, Suite 5</p>
            <p class="mb-4 font-crimson">West Valley City, UT 84119</p>
            
            <p class="mb-4 font-crimson">(801) 969-6609</p>
          </div>
          
          <p class="font-crimson text-sm mb-2">
            This website provides general information about patents, trademarks, copyrights and services available at Dobbin IP Law P.C. It 
            is for information only and does not constitute legal advice, nor does it constitute the start of an attorney-client relationship. For 
            specific questions about your situation, please feel free to <a href="#" @click.prevent="scrollToContactForm" class="underline hover:text-dobbin-bright-green">contact us</a>.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact Us | Dobbin IP Law P.C.',
  meta: [
    { name: 'description', content: 'Contact Dobbin IP Law for a strategy session about your patent, trademark, and copyright needs.' }
  ]
})

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
  captcha: ''
});

const submitting = ref(false);
const formSuccess = ref(false);
const formError = ref(null);
const contactFormRef = ref(null);

const scrollToContactForm = () => {
  const formElement = document.querySelector('.contact-form');
  if (formElement) {
    formElement.scrollIntoView({ behavior: 'smooth' });
  }
};

const submitForm = async () => {
  submitting.value = true;
  formError.value = null;
  
  // Validate captcha
  if (form.value.captcha !== '21') {
    formError.value = 'Incorrect captcha answer. Please try again.';
    submitting.value = false;
    return;
  }
  
  try {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real application, you'd make an API call here
    console.log('Form submitted:', form.value);
    
    // Reset form
    form.value = {
      name: '',
      email: '',
      subject: '',
      message: '',
      captcha: ''
    };
    
    formSuccess.value = true;
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      formSuccess.value = false;
    }, 5000);
  } catch (error) {
    console.error('Form submission error:', error);
    formError.value = 'There was an error submitting your form. Please try again later.';
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.contact-page {
  max-width: 100%;
}
</style>