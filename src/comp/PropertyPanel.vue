<script setup lang="ts">
import { ShapeProps, type ShapeAttr } from "@/types/ShapeProps";
import { clamp, Panel, useVueFlow } from "@vue-flow/core";
import { TextAlignCenterIcon, TextAlignEndIcon, TextAlignJustifyIcon, TextAlignStartIcon } from "lucide-vue-next";
import { computed, onUpdated } from "vue";

const textAlignData = [
  { icon: TextAlignStartIcon, align: "left" },
  { icon: TextAlignCenterIcon, align: "center" },
  { icon: TextAlignEndIcon, align: "right" },
  { icon: TextAlignJustifyIcon, align: "justify" },
];

type Attr = { attr: ShapeAttr }

const { attr } = defineProps<Attr>()
const flow = useVueFlow()
let id = flow.getSelectedNodes.value[0]!.id

onUpdated(() => id = flow.getSelectedNodes.value[0]!.id)

let fillAttr = computed<string | undefined>({
  get() { return attr.fillColor },
  set(v) {
    if (v == '' || !v) return
    flow.updateNodeData<ShapeProps>(id, n => ({
      attr: { ...n.data.attr, fillColor: v }
    }))
  }
})

let strokeColorAttr = computed<string | undefined>({
  get() { return attr.strokeColor },
  set(v) {
    if (v == '' || !v) return
    flow.updateNodeData<ShapeProps>(id, n => ({
      attr: { ...n.data.attr, strokeColor: v }
    }))
  }
})

let borderWidth = computed<string>({
  get() { return attr.strokeWidth.toString() },
  set(v) {
    if (v == '') return
    flow.updateNodeData<ShapeProps>(id, n => ({
      attr: { ...n.data.attr, strokeWidth: clamp(parseInt(v), 0, 20) }
    }))
  }
})
let textSize = computed<string>({
  get() { return attr.textSize.toString() },
  set(v) {
    if (v == '') return
    flow.updateNodeData<ShapeProps>(id, n => ({
      attr: { ...n.data.attr, textSize: clamp(parseInt(v), 0, 50) }
    }))
  }
})

</script>

<template>
<Panel
  position="top-right"
  class="bg-base-100 px-2 w-52 flex flex-col gap-1 m-0! h-dvh border dark:border-zinc-600 border-zinc-300"
>
  <div class="flex gap-2">
    <!-- Fill -->
    <div class="w-full">
      <label
        for="color-input"
        class="label text-xs"
      >Fill</label>
      <input
        id="color-input"
        class="input input-sm px-1"
        type="color"
        v-model="fillAttr"
      />
    </div>

    <!-- Border -->
    <div class="w-full">
      <label
        for="border-color-input"
        class="label text-xs"
      >Border</label>
      <input
        id="border-color-input"
        class="input input-sm px-1"
        type="color"
        v-model="strokeColorAttr"
      />
    </div>
  </div>

  <div class="flex gap-2">
    <div class="w-full">
      <label
        for="stroke-width-input"
        class="label text-xs"
      >Border width</label>
      <input
        id="stroke-width-input"
        class="input input-sm"
        type="number"
        max="20"
        min="0"
        v-model="borderWidth"
      />
    </div>

    <div class="w-full">
      <label
        for="font-size-input"
        class="label text-xs"
      >Font size</label>
      <input
        id="font-size-input"
        class="input input-sm"
        type="number"
        v-model="textSize"
      />
    </div>
  </div>

  <div class="flex gap-1 justify-center mt-1">
    <button
      v-for="data in textAlignData"
      :key="data.align"
      @click="e =>
        flow.updateNodeData<ShapeProps>(id, n => ({
          attr: { ...n.data.attr, textAlign: data.align }
        }))
      "
      class="rounded-md p-1.5 cursor-pointer"
      :class="attr.textAlign == data.align
        ? 'bg-base-content/20'
        : 'hover:bg-base-content/10'
        "
    >
      <component
        :is="data.icon"
        class="size-4.5"
      />
    </button>
  </div>
</Panel>
</template>
