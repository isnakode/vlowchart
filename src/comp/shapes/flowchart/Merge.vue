<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';

  const { size } = defineProps<{ size: Dimensions }>()
</script>

<template>
  <path :d="`M0 0H${size.width}L${size.width / 2} ${size.height}Z`" />
</template>
