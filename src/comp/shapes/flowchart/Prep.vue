<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const s = computed(() => size.width * 0.15)

  const d = computed(
    () =>
      `M${s.value} 0L${size.width - s.value} 0L${size.width} ${size.height / 2}L` +
      `${size.width - s.value} ${size.height}L${s.value} ${size.height}L0 ${size.height / 2}Z`
  )
</script>

<template>
  <path :d="d" />
</template>
