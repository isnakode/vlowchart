<script setup lang="ts">
  import { ShapeAttr } from '@/types/ShapeProps';
  import type { Dimensions } from '@vue-flow/core';
  import { computed } from 'vue';
  import Circle from './shapes/flowchart/Circle.vue';
  import Database from './shapes/flowchart/Database.vue';
  import Decision from './shapes/flowchart/Decision.vue';
  import Delay from './shapes/flowchart/Delay.vue';
  import DirectData from './shapes/flowchart/DirectData.vue';
  import Display from './shapes/flowchart/Display.vue';
  import Doc from './shapes/flowchart/Doc.vue';
  import Input from './shapes/flowchart/Input.vue';
  import InternalStorage from './shapes/flowchart/InternalStorage.vue';
  import Io from './shapes/flowchart/Io.vue';
  import Loop from './shapes/flowchart/Loop.vue';
  import LoopLimit from './shapes/flowchart/LoopLimit.vue';
  import Merge from './shapes/flowchart/Merge.vue';
  import MultiDoc from './shapes/flowchart/MultiDoc.vue';
  import Offpage from './shapes/flowchart/Offpage.vue';
  import Prep from './shapes/flowchart/Prep.vue';
  import PreProcess from './shapes/flowchart/PreProcess.vue';
  import Process from './shapes/flowchart/Process.vue';
  import Start from './shapes/flowchart/Start.vue';
  import StoredData from './shapes/flowchart/StoredData.vue';

  const p = defineProps<{ attr: ShapeAttr, dimensions: Dimensions, type: string }>();

  const viewBox = computed(
    () => `-${p.attr.strokeWidth / 2} -${p.attr.strokeWidth / 2}` +
      ` ${p.dimensions.width + p.attr.strokeWidth}` +
      ` ${p.dimensions.height + p.attr.strokeWidth}`
  )

  const classes = computed(() => [
    p.attr.fillColor ? '' : 'fill-base-100!',
    p.attr.strokeColor ? '' : 'dark:stroke-zinc-600 stroke-zinc-400'
  ])

</script>
<template>
  <svg
    :width="p.dimensions.width"
    :height="p.dimensions.height"
    :fill="p.attr.fillColor"
    :stroke="p.attr.strokeColor"
    :stroke-width="p.attr.strokeWidth"
    :viewBox="viewBox"
    stroke-linejoin="round"
    preserveAspectRatio="none"
    :class="classes"
  >
    <Start
      :size="p.dimensions"
      v-if="p.type == 'start'"
    />
    <Io
      :size="p.dimensions"
      v-else-if="p.type == 'io'"
    />
    <Decision
      :size="p.dimensions"
      v-else-if="p.type == 'decision'"
    />
    <Process
      :size="p.dimensions"
      v-else-if="p.type == 'process'"
    />
    <Doc
      :size="p.dimensions"
      v-else-if="p.type == 'doc'"
    />
    <MultiDoc
      :size="p.dimensions"
      v-else-if="p.type == 'multi-doc'"
    />
    <Prep
      :size="p.dimensions"
      v-else-if="p.type == 'prep'"
    />
    <Loop
      :size="p.dimensions"
      v-else-if="p.type == 'loop'"
    />
    <Input
      :size="p.dimensions"
      v-else-if="p.type == 'input'"
    />
    <StoredData
      :size="p.dimensions"
      v-else-if="p.type == 'stored-data'"
    />
    <LoopLimit
      :size="p.dimensions"
      v-else-if="p.type == 'loop-limit'"
    />
    <Delay
      :size="p.dimensions"
      v-else-if="p.type == 'delay'"
    />
    <Display
      :size="p.dimensions"
      v-else-if="p.type == 'display'"
    />
    <Offpage
      :size="p.dimensions"
      v-else-if="p.type == 'offpage'"
    />
    <DirectData
      :size="p.dimensions"
      v-else-if="p.type == 'direct-data'"
    />
    <InternalStorage
      :size="p.dimensions"
      v-else-if="p.type == 'instorage'"
    />
    <PreProcess
      :size="p.dimensions"
      v-else-if="p.type == 'preprocess'"
    />
    <Circle
      :size="p.dimensions"
      v-else-if="p.type == 'circle'"
    />
    <Merge
      :size="p.dimensions"
      v-else-if="p.type == 'merge'"
    />
    <Database
      :size="p.dimensions"
      v-else-if="p.type == 'db'"
    />
  </svg>
</template>