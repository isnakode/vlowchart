<script setup lang="ts">
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';

  const { size } = defineProps<{ size: Dimensions }>()

  const s = computed(() => size.height * 0.3)

  const d = computed(
    () => `M0 ${s.value}L${size.width} 0L${size.width} ${size.height}L0 ${size.height}Z`
  )
</script>

<template>
  <path :d="d" />
</template>
