<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const r = computed(() => size.height / 2)

  const d = computed(
    () =>
      `M0 ${r.value}L${r.value * 0.8} 0H${size.width}V${size.height}H${r.value * 0.8}Z`
  )
</script>

<template>
  <path :d="d" />
</template>
