<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const d = computed(
    () =>
      `M0 ${size.height / 2}L${size.width / 2} 0L${size.width} ${size.height / 2}L${size.width / 2} ${size.height}Z`
  )
</script>

<template>
  <path :d="d" />
</template>
