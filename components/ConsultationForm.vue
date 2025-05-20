<template>
  <section class="py-16 bg-dobbin-dark-green" :id="formId">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold mb-6 text-center font-crimson text-dobbin-dark-green">
          {{ title }}
        </h2>
        <p class="text-center text-gray-600 mb-8 font-crimson">
          <span class="font-bold">
            {{ subtitle }}
          </span>
        </p>
        <p class="text-left text-gray-600 mb-8 font-crimson">
          {{ description }}
        </p>
        
        <!-- Netlify Form -->
        <form :name="formName" method="POST" data-netlify="true" netlify-honeypot="bot-field" class="space-y-6">
          <!-- Hidden inputs for Netlify -->
          <input type="hidden" name="form-name" :value="formName" />
          <p class="hidden">
            <label>Don't fill this out if you're human: <input name="bot-field" /></label>
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="name" class="block text-gray-700 font-medium mb-2">Your Name</label>
              <input type="text" id="name" name="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dobbin-dark-green focus:border-dobbin-dark-green" required>
            </div>
            <div>
              <label for="email" class="block text-gray-700 font-medium mb-2">Email Address</label>
              <input type="email" id="email" name="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dobbin-dark-green focus:border-dobbin-dark-green" required>
            </div>
          </div>
          <div>
            <label for="phone" class="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input type="tel" id="phone" name="phone" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dobbin-dark-green focus:border-dobbin-dark-green" required>
          </div>
          <div>
            <label for="message" class="block text-gray-700 font-medium mb-2">{{ messageLabel }}</label>
            <textarea id="message" name="message" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dobbin-dark-green focus:border-dobbin-dark-green"></textarea>
          </div>
          <div class="flex justify-center">
            <button type="submit" class="bg-dobbin-dark-green text-white font-bold py-3 px-8 rounded-lg transition hover:bg-opacity-90 transform hover:scale-105 shadow-lg text-lg">
              {{ buttonText }}
            </button>
          </div>
        </form>
        
        <!-- Alternative Contact -->
        <div class="mt-8 text-center">
          <p class="text-gray-600 font-crimson">{{ altContactText }}</p>
          <p class="font-bold text-dobbin-dark-green text-2xl font-crimson">{{ phoneNumber }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  formId: {
    type: String,
    default: 'scheduleForm'
  },
  formName: {
    type: String,
    default: 'contact-form'
  },
  title: {
    type: String,
    default: 'Schedule Your 30 Minute Complementary Strategy Session'
  },
  subtitle: {
    type: String,
    default: 'Protect your valuable ideas with a complimentary 30-minute strategy session.'
  },
  description: {
    type: String,
    default: 'Meet with our lawyer, Geoff — in person, by phone, or over Zoom. No obligation, just expert guidance on your best next steps.'
  },
  messageLabel: {
    type: String,
    default: 'Tell us about your invention or IP needs (optional)'
  },
  buttonText: {
    type: String,
    default: 'Request My Strategy Session'
  },
  altContactText: {
    type: String,
    default: 'Or call us directly at:'
  },
  phoneNumber: {
    type: String,
    default: '(801) 969-6609'
  }
});
</script>

<style scoped>
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Hide honeypot field */
.hidden {
  display: none;
}

/* Focus styles for form elements */
.focus\:ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\:ring-dobbin-dark-green:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgba(28, 83, 52, var(--tw-ring-opacity));
}

.focus\:border-dobbin-dark-green:focus {
  --tw-border-opacity: 1;
  border-color: rgba(28, 83, 52, var(--tw-border-opacity));
}
</style>