<script setup lang="ts">
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useVueFlow, type EdgeProps } from '@vue-flow/core';
import { computed } from 'vue';

const p = defineProps<EdgeProps<{ text: string }>>()
const path = computed(() => getSmoothStepPath(p))
const flow = useVueFlow()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
<BaseEdge
  :id="p.id"
  :style="p.style"
  :path="path[0]"
  :marker-end="p.markerEnd"
/>

<EdgeLabelRenderer>
  <div
    :id="`edge-input-${p.id}`"
    class="absolute nodrag nopan outline-none"
    :class="{
      'bg-base-300': true
    }"
    contenteditable
    :style="{
      transform: `translate(-50%,-50%) translate(${path[1]}px,${path[2]}px)`,
    }"
    @blur="ev => {
      flow.setEdges(edges => {
        return edges.map(e => {
          if (e.id == p.id) {
            return { ...e, label: (ev.target as HTMLElement).innerText }
          }
          return e
        })
      })
    }"
  >
    {{ p.label }}
  </div>
</EdgeLabelRenderer>
</template>