<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const s = computed(() => size.width * 0.15)

  const d = computed(
    () =>
      `M0 0L${size.width} 0L${size.width - s.value} ${size.height}L${s.value} ${size.height}Z`
  )
</script>

<template>
  <path :d="d" />
</template>
