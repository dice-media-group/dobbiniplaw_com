<template>
  <div>
    <!-- Hero section with navy background -->
    <HeroBanner 
      title="Thank You!" 
      bgColor="bg-dobbin-navy"
      titleSize="text-5xl"
    >
      <p class="mb-4 font-crimson text-white"></p>
    </HeroBanner>
    
    <!-- Main content section -->
    <div class="py-12">
      <div class="container mx-auto px-8">
        <div class="max-w-[1140px] mx-auto terms-content font-crimson">
          <p>Your message has been sent successfully. We'll get back to you shortly.</p>
          <a href="/">Return to Home</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bg-dobbin-navy {
  background-color: #0c1559;
}

/* Text content styling */
.terms-content {
  color: #333;
  line-height: 1.7;
}

.terms-content h2 {
  color: #333;
  margin-bottom: 1.5rem;
}

.terms-content h3 {
  color: #000;
  font-size: 1.25rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.terms-content h4 {
  font-size: 1.1rem;
  color: #333;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.terms-content p {
  margin-bottom: 1.25rem;
  line-height: 1.8;
  font-size: 1.05rem;
}

.terms-content ul {
  margin-bottom: 1.5rem;
  list-style-type: disc;
  padding-left: 2rem;
}

.terms-content li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}
</style>
