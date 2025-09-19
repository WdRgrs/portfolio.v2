<!-- Resume.vue -->
<template>
  <div class="resume-page">
    <div class="resume-controls">
      <h1>Resume</h1>
      <div class="actions">
        <a 
          href="/resume.pdf" 
          download="Wade_Rogers_Resume.pdf"
          class="btn btn-primary"
        >
          Download PDF
        </a>
        <button @click="openInNewTab" class="btn btn-secondary">
          Open in New Tab
        </button>
      </div>
    </div>
    
    <!-- Embedded PDF viewer -->
    <div class="pdf-viewer">
      <iframe 
        src="/resume.pdf#toolbar=0" 
        width="100%" 
        height="800px"
        frameborder="0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const openInNewTab = () => {
  window.open('/resume.pdf', '_blank')
}
</script>