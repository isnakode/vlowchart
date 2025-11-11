<script setup lang="ts">
  import { Handle, Position, useVueFlow } from '@vue-flow/core';
  import { ArrowBigDown, ArrowBigLeft, ArrowBigRight, ArrowBigUp } from 'lucide-vue-next';
  import { computed, onMounted } from 'vue';

  const p = defineProps<{
    offset: { top: number, right: number, bottom: number, left: number },
    showArrow: boolean,
    showHandle: boolean
  }>()

  const directions = [
    {
      id: '1',
      position: Position.Left,
      style: computed(() => ({ 'left': `${p.offset.left}px` })),
      arrow: ArrowBigLeft,
      arrowWrapperClass: 'absolute -translate-y-1/2 top-1/2 right-0! -left-6',
    },
    {
      id: '2',
      position: Position.Right,
      style: computed(() => ({ 'right': `${p.offset.right}px` })),
      arrow: ArrowBigRight,
      arrowWrapperClass: 'absolute -translate-y-1/2 top-1/2 -right-6',
    },
    {
      id: '3',
      position: Position.Top,
      style: computed(() => ({ 'top': `${p.offset.top}px` })),
      arrow: ArrowBigUp,
      arrowWrapperClass: 'absolute -translate-x-1/2 left-1/2 bottom-0 -top-6',
    },
    {
      id: '4',
      position: Position.Bottom,
      style: computed(() => ({ 'bottom': `${p.offset.bottom}px` })),
      arrow: ArrowBigDown,
      arrowWrapperClass: 'absolute -translate-x-1/2 left-1/2 -bottom-6',
    },
  ];
  onMounted(() => {
    useVueFlow().updateNodeInternals()
  })
</script>

<template>
  <Handle
    v-for="dir in directions"
    :position="dir.position"
    :id="dir.id"
    :key="dir.id"
    type="source"
    :style="dir.style.value"
    :class="[
      'rounded-full',
      showHandle ? 'bg-white! border-blue-300! border-1' : ''
    ]"
  >
    <component
      :is="dir.arrow"
      class="fill-white/10 hover:fill-white/70 stroke-none hidden"
      :class="[{ 'block!': showArrow }, dir.arrowWrapperClass]"
    />
  </Handle>
</template>