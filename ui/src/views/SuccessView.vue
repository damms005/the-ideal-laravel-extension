<template>
  <div class="success-view" ref="container" tabindex="0">
    <SubmissionSuccessful />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import SubmissionSuccessful from '@/components/SubmissionSuccessful.vue';

export default defineComponent({
  name: 'SuccessView',
  components: {
    SubmissionSuccessful,
  },
  setup() {
    const container = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (container.value) {
        container.value.focus();
      }
    });

    return {
      container,
    };
  },
});
</script>

<style scoped>
.success-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  outline: none;
}
</style>