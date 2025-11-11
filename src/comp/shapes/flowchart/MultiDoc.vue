<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const waveHeight = computed(() => size.height * 0.07)
  const wGap = computed(() => size.width * 0.10)
  const hGap = computed(() => size.height * 0.15)

  const d = computed(
    () =>
      `M0 ${hGap.value}H${size.width - wGap.value}V${size.height - waveHeight.value}Q ` +
      `${size.width * 0.75} ${size.height + waveHeight.value} ${size.width * 0.5} ` +
      `${size.height - waveHeight.value}T0 ${size.height - waveHeight.value}Z`
  )
</script>

<template>
  <path
    :d="d"
    :transform="`translate(${wGap}, ${-hGap})`"
  />
  <path
    :d="d"
    :transform="`translate(${wGap / 2}, ${-hGap / 2})`"
  />
  <path :d="d" />
</template>
