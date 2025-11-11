<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()
  const r = computed(() => Math.min(size.width, size.height) / 2)
</script>

<template>
  <circle
    :cx="r"
    :cy="r"
    :r="r"
  />
</template>
