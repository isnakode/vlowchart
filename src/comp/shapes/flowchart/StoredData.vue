<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const r = computed(() => size.height / 2)

  const d = computed(
    () =>
      `M${r.value} ${size.height}A${r.value} ${r.value} 0 1 1 ${r.value} 0H${size.width}` +
      `Q${size.width - size.width * 0.3} ${r.value} ${size.width} ${size.height}Z`
  )
</script>

<template>
  <path :d="d" />
</template>
