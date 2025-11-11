<script setup lang="ts">
import { computed } from 'vue'
import type { Dimensions } from '@vue-flow/core'

const { size } = defineProps<{ size: Dimensions }>()

const bevel = computed(() => Math.min(size.width,size.height) * 0.3)

const d = computed(
  () =>
    `M${bevel.value} 0H${size.width - bevel.value}L${size.width} ${bevel.value}V${size.height}H0V${bevel.value}Z`
)
</script>

<template>
  <path :d="d" />
</template>
