<template>
  <div class="container mx-auto px-4 py-8 max-w-5xl">
    <h1 class="text-3xl font-bold mb-6">Flat Fee Page Draft Options</h1>
    <p class="mb-8">Below are links to the three different design options for the flat fee page. Click on each option to preview.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="border rounded-lg overflow-hidden">
        <div class="bg-blue-50 p-4">
          <h2 class="text-xl font-bold">Option 1</h2>
          <p class="text-sm">Simple Content Page with Table Component</p>
        </div>
        <div class="p-4">
          <p class="mb-4">Straightforward table-based presentation of fees that preserves the original document format.</p>
          <NuxtLink to="/drafts/flat-fees-option1" class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Option 1
          </NuxtLink>
        </div>
      </div>
      
      <div class="border rounded-lg overflow-hidden">
        <div class="bg-blue-50 p-4">
          <h2 class="text-xl font-bold">Option 2</h2>
          <p class="text-sm">Accordion-Style Collapsible Sections</p>
        </div>
        <div class="p-4">
          <p class="mb-4">Interactive accordion sections that hide/show fee details as needed. Great for mobile viewing.</p>
          <NuxtLink to="/drafts/flat-fees-option2" class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Option 2
          </NuxtLink>
        </div>
      </div>
      
      <div class="border rounded-lg overflow-hidden">
        <div class="bg-blue-50 p-4">
          <h2 class="text-xl font-bold">Option 3</h2>
          <p class="text-sm">Interactive Fee Calculator Component</p>
        </div>
        <div class="p-4">
          <p class="mb-4">Modern design with an interactive calculator to help clients estimate costs in real-time.</p>
          <NuxtLink to="/drafts/flat-fees-option3" class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Option 3
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Flat Fee Page Draft Options | Dobbin IP Law P.C.',
})
</script>
