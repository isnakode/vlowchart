<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const rx = computed(() => size.width / 2)
  const ry = computed(() => size.height / 2)
  const r = computed(() => Math.min(rx.value, ry.value))

  const d = computed(
    () =>
      `M0 0H${size.width - r.value}A${r.value} ${ry.value} 0 1 1 ${size.width - r.value} ${size.height}H0Z`
  )
</script>

<template>
  <path :d="d" />
</template>
