<template>
  <div>
    <div class="bg-navy text-white py-12">
      <div class="container mx-auto px-4">
        <h1 class="text-4xl font-semibold">Terms of Service</h1>
      </div>
    </div>
    <div class="container mx-auto py-12 px-4">
      <div class="max-w-4xl prose lg:prose-lg">
        <ContentDoc />
      </div>
    </div>
  </div>
</template>

<style>
.bg-navy {
  background-color: #0c1559;
}

/* Additional styling for the content */
.prose h2 {
  color: #0c1559;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.prose h3 {
  color: #0c1559;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  font-weight: 600;
}

.prose ul {
  margin-left: 1.5rem;
  list-style-type: disc;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose strong {
  font-weight: 600;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.7;
}
</style>
