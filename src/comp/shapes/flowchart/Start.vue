<script setup lang="ts">
import type { Dimensions } from '@vue-flow/core';
import { computed } from 'vue';

const { size } = defineProps<{ size: Dimensions }>()

const r = computed(() => Math.min(size.height, size.width) / 2)
</script>

<template>
	<rect
		x="0"
		y="0"
		:width="size.width"
		:height="size.height"
		:rx="r"
		:ry="r"
	/>
</template>
