<template>
  <LoginForm @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import LoginForm from '../components/LoginForm.vue'

const router = useRouter()
const vscode = (window as any).acquireVsCodeApi()

const handleSubmit = (payload: { email: string; password: string }) => {
  vscode.postMessage({ type: 'submit', email: payload.email })
}

const handleMessage = (event: MessageEvent) => {
  const message = event.data
  if (message?.type === 'submitted') {
    router.push('/success')
  }
}

onMounted(() => {
  window.addEventListener('message', handleMessage)
})

onUnmounted(() => {
  window.removeEventListener('message', handleMessage)
})
</script>