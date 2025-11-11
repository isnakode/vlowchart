<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const r = computed(() => size.width / 2)
  const h = computed(() => size.height * 0.15)

  const d = computed(
    () =>
      `M${size.width} ${size.height - h.value}A${r.value} ${h.value} 0 1 1 0 ${size.height - h.value}V${h.value}H${size.width}Z`
  )
</script>

<template>
  <path :d="d" />
  <ellipse
    :cx="r"
    :cy="h"
    :rx="r"
    :ry="h"
  />
</template>
