<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
        />
      </div>
      
      <button type="submit" class="submit-btn">
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const emit = defineEmits<{
  submit: [payload: { email: string; password: string }]
}>()

const handleSubmit = () => {
  emit('submit', {
    email: email.value,
    password: password.value
  })
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--vt-c-text-1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--vt-c-text-1);
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vt-c-divider);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--vt-c-white);
  color: var(--vt-c-text-1);
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: var(--vt-c-brand);
  box-shadow: 0 0 0 2px var(--vt-c-brand-light);
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--vt-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: var(--vt-c-brand-dark);
}

.submit-btn:active {
  transform: translateY(1px);
}
</style>