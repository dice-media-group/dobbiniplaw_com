<template>
  <div>
    <!-- Video Modal Component -->
    <VideoModal 
      :is-open="isVideoModalOpen" 
      :video-src="videoModalSrc" 
      video-title="Patent Attorney Geoff Dobbin Explains IP Law"
      @close="closeVideoModal" 
    />

    <!-- Home Banner Component -->
    <HomeBanner @open-video="openVideoModal" />
    
    <!-- Video Testimonial Component -->
    <VideoTestimonial 
      thumbnail-url="https://img.youtube.com/vi/ljNiDscQ-Vw/maxresdefault.jpg"
      thumbnail-alt="Video thumbnail: Tips for Choosing a Patent Attorney"
      quote="Geoff helped us secure patents that were essential to our $2M funding round. His clear explanation of complex IP concepts made the process so much easier than I expected."
      attribution="- Lee Von Gunten, CEO of Watchdog Manufacturing"
      cta-link="/testimonials"
      cta-text="See what other clients say"
      @open-video="openVideoModal"
    />
    
    <!-- Process Steps Component -->
    <ProcessSteps 
      title="How We Make IP Protection Simple"
      :steps="processSteps"
      cta-text="Get Started Today"
      cta-link="#scheduleForm"
    />
    
    <!-- Service Overview Component -->
    <ServiceOverview />
    
    <!-- Attorney Profile Component -->
    <AttorneyProfile 
      name="Geoff Dobbin"
      title="Meet Your Attorney"
      image-src="/img/geoff-dobbin.jpg"
      :paragraphs="attorneyParagraphs"
      :stats="attorneyStats"
      cta-text="Learn more about Geoff"
      cta-link="/about"
    />
    
    <!-- Consultation Form Component -->
    <ConsultationForm 
      form-id="scheduleForm"
      form-name="homepage-contact"
    />
    
    <!-- Page CTA Component -->
    <PageCTA />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PageCTA from '../components/PageCTA.vue';
import VideoModal from '../components/VideoModal.vue';
import HomeBanner from '../components/HomeBanner.vue';
import VideoTestimonial from '../components/VideoTestimonial.vue';
import ProcessSteps from '../components/ProcessSteps.vue';
import ServiceOverview from '../components/ServiceOverview.vue';
import AttorneyProfile from '../components/AttorneyProfile.vue';
import ConsultationForm from '../components/ConsultationForm.vue';

// Video modal state
const isVideoModalOpen = ref(false);
const videoModalSrc = ref('');

// Methods to handle the video modal
function openVideoModal() {
  // YouTube embed URL with autoplay parameter
  videoModalSrc.value = 'https://www.youtube.com/embed/ljNiDscQ-Vw?autoplay=1';
  isVideoModalOpen.value = true;
}

function closeVideoModal() {
  isVideoModalOpen.value = false;
  // Reset video src to stop playback
  videoModalSrc.value = '';
}

// Content for process steps
const processSteps = [
  {
    title: "Complementary Strategy Session",
    description: "We start with a free strategy session to understand your invention and goals. You'll leave with clarity on your options, timeline, and costs."
  },
  {
    title: "Clear, Strategic Path",
    description: "We'll create a straightforward protection plan in plain language, so you understand exactly what's happening at each stage of the process."
  },
  {
    title: "Ongoing Partnership",
    description: "We're with you for the long haul. From application to approval and beyond, we're your IP partner as your business grows."
  }
];

// Content for attorney profile
const attorneyParagraphs = [
  "For over 20 years, Geoff Dobbin has assisted independent inventors and other creators with protecting their intellectual property. With a background in physics, he quickly grasps complex concepts across diverse industries.",
  "Since founding Dobbin IP Law P.C. in 2004, Geoff has focused on making patent law accessible to independent inventors and small businesses. He believes that clear communication and strategic guidance are just as important as legal expertise."
];

const attorneyStats = [
  {
    label: "Patents Secured",
    value: "100+",
    icon: "M12 6v6m0 0v6m0-6h6m-6 0H6"
  },
  {
    label: "Years of Experience",
    value: "20+",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  }
];

useHead({
  title: 'Dobbin IP Law P.C. | Clear & Strategic Patent Attorney | Utah',
  meta: [
    { 
      name: 'description', 
      content: 'Navigate IP law with confidence. Dobbin IP Law makes patent, trademark, and copyright protection simple with clear guidance and strategic solutions for inventors and businesses.' 
    }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap' }
  ]
})
</script>

<style>
/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Adjust the max width for desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
  }
}
</style>