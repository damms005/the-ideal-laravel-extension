<template>
  <div class="success-container">
    <div class="success-icon">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#22c55e" stroke-width="2" fill="#dcfce7"/>
        <path d="m9 12 2 2 4-4" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <h2 class="success-title">Success!</h2>
    <p class="success-message">Your login credentials have been submitted successfully.</p>
  </div>
</template>

<style scoped>
.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.success-icon {
  margin-bottom: 1rem;
}

.success-title {
  color: #22c55e;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.success-message {
  color: #6b7280;
  font-size: 1rem;
  margin: 0;
  line-height: 1.5;
}
</style>