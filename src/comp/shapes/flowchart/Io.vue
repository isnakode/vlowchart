<script setup lang="ts">
import type { Dimensions } from '@vue-flow/core';
import { computed } from 'vue';

const p = defineProps<{ size: Dimensions }>()

const s = computed(() => p.size.width * 0.1)
const d = computed(() => `M ${s.value} 0L${p.size.width} 0L${p.size.width - s.value} ${p.size.height}L0 ${p.size.height}Z`)
</script>

<template>
  <path :d="d" />
</template>
