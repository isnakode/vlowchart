<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const gap = computed(() => size.width * 0.15)
</script>

<template>
  <path :d="`M0 0H${size.width}V${size.height}H0Z`" />
  <line
    :x1="gap"
    y1="0"
    :x2="gap"
    :y2="size.height"
  />
  <line
    :x1="size.width - gap"
    y1="0"
    :x2="size.width - gap"
    :y2="size.height"
  />
</template>
