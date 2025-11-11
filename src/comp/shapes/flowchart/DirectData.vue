<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const r = computed(() => size.height / 2)
  const w = computed(() => Math.min(size.width * 0.15, r.value * 0.7))
  const rw = computed(() => Math.min(w.value, r.value))

  const d = computed(
    () =>
      `M${w.value} ${size.height}A${rw.value} ${r.value} 0 1 1 ${w.value} 0H${size.width - w.value}V${size.height}Z`
  )
</script>

<template>
  <path :d="d" />
  <ellipse
    :cx="size.width - w"
    :cy="r"
    :rx="rw"
    :ry="r"
  />
</template>
