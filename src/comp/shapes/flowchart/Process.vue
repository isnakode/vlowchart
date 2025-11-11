<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const d = computed(() => `M0 0H${size.width}V${size.height}H0Z`)
</script>

<template>
  <path :d="d" />
</template>
