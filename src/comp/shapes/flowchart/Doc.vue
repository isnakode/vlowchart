<script setup lang="ts">
import { computed } from 'vue'
import type { Dimensions } from '@vue-flow/core'

const { size } = defineProps<{ size: Dimensions }>()

const waveHeight = computed(() => size.height * 0.1)

const d = computed(
  () =>
    `M0 0H${size.width}V${size.height - waveHeight.value}Q ` +
    `${size.width - size.width / 2 / 2} ${size.height + waveHeight.value} ` +
    `${size.width - size.width / 2} ${size.height - waveHeight.value}T0 ${size.height - waveHeight.value}Z`
)
</script>

<template>
  <path :d="d" />
</template>
