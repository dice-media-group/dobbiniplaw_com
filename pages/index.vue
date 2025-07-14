<template>
  <div>
    <!-- Video Modal Component -->
    <VideoModal 
      :is-open="isVideoModalOpen" 
      :video-src="videoModalSrc" 
      :video-title="videoModalTitle"
      @close="closeVideoModal" 
    />

    <!-- Home Banner Component -->
    <HomeBanner @open-video="openEducationalVideo" />
    
    <!-- Video Testimonial Component -->
    <VideoTestimonial 
      thumbnail-url="https://img.youtube.com/vi/18gFVGE2Za0/0.jpg"
      thumbnail-alt="Video testimonial from Dr. Mark J. Hagmann, CTO of NewPath Research"
      quote="Geoffrey Dobbin has been my patent attorney for the past six years and I am highly impressed by his ability to understand a wide range of complex technologies and describe them clearly, suggest appropriate strategies for intellectual property, and his adroitness in communicating with the USPTO."
      attribution="- Dr. Mark J. Hagmann, CTO, NewPath Research, LLC"
      cta-link="/testimonials"
      cta-text="See what other clients say"
      @open-video="openTestimonialVideo"
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

// Enhanced SEO for homepage
useSEO({
  title: 'Clear & Strategic Patent Attorney',
  description: 'Utah IP attorney providing clear, strategic patent, trademark, & copyright protection. We simplify the IP process for inventors & businesses. Get a free consultation.',
  path: '/',
  keywords: 'patent attorney Utah, intellectual property lawyer, trademark attorney, copyright lawyer, Utah IP law, patent protection, West Valley City attorney',
  ogImage: '/og-homepage-image.jpg',
  type: 'website'
})

// 🆕 ADD: Test structured data on homepage only
useStructuredData({
  "@type": "LegalService", // More specific than LocalBusiness
  "serviceType": "Intellectual Property Law"
})

// Video modal state
const isVideoModalOpen = ref(false);
const videoModalSrc = ref('');
const videoModalTitle = ref('');

// Method to open educational video (from HomeBanner)
function openEducationalVideo() {
  videoModalSrc.value = 'https://www.youtube.com/embed/ljNiDscQ-Vw?autoplay=1';
  videoModalTitle.value = 'Tips for Choosing a Patent Attorney';
  isVideoModalOpen.value = true;
}

// Method to open testimonial video (from VideoTestimonial)
function openTestimonialVideo() {
  videoModalSrc.value = 'https://www.youtube.com/embed/18gFVGE2Za0?autoplay=1';
  videoModalTitle.value = 'Client Testimonial - Dr. Mark J. Hagmann';
  isVideoModalOpen.value = true;
}

function closeVideoModal() {
  isVideoModalOpen.value = false;
  // Reset video src to stop playback
  videoModalSrc.value = '';
  videoModalTitle.value = '';
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
  "For over 25 years, Geoff Dobbin has assisted independent inventors and other creators with protecting their intellectual property. With a background in physics, he quickly grasps complex concepts across diverse industries.",
  "Since founding Dobbin IP Law P.C. in 2004, Geoff has focused on making patent law accessible to independent inventors and small businesses. He believes that clear communication and strategic guidance are just as important as legal expertise."
];

const attorneyStats = [
  {
    label: "Patents Secured",
    value: "250+",
    icon: "M12 6v6m0 0v6m0-6h6m-6 0H6"
  },
  {
    label: "Years of Experience",
    value: "25+",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
  }
];
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