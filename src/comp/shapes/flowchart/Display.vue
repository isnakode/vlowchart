<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()
  const r_kiri = computed(() => Math.min(size.width, size.height) / 2)
  const r_kanan_x = computed(() => Math.min(size.width, size.height) / 2)
  const r_kanan_y = computed(() => size.height / 2)
  const x_arc_start = computed(() => size.width - r_kanan_x.value)

  const d = computed(
    () =>
      `M0 ${size.height / 2}L${r_kiri.value * 0.8} 0H${x_arc_start.value}` +
      `A${r_kanan_x.value} ${r_kanan_y.value} 0 1 1 ` +
      `${x_arc_start.value} ${size.height}H${r_kiri.value * 0.8}Z`
  )
</script>

<template>
  <path :d="d" />
</template>
