<script setup lang="ts">
import type { ShapeProps } from "@/types/ShapeProps";
import {
	clamp,
	Position,
	useConnection,
	useVueFlow,
	type NodeProps
} from "@vue-flow/core";
import { NodeResizer } from "@vue-flow/node-resizer";
import { NodeToolbar } from "@vue-flow/node-toolbar";
import { LucideSquareRoundCorner, LucideType, TextAlignCenterIcon, TextAlignEndIcon, TextAlignJustifyIcon, TextAlignStartIcon } from "lucide-vue-next";
import { computed, type CSSProperties } from "vue";
import ShapeHandle from "./ShapeHandle.vue";
import Shapes from "./Shapes.vue";
import noBgImage from '@/assets/transparent.png'

const { data, ...p } = defineProps<NodeProps<ShapeProps>>()
defineEmits(['updateNodeInternals'])
const conn = useConnection()
const flow = useVueFlow()
const gap = 50


const textAlignData = [
	{ icon: TextAlignStartIcon, align: "left" },
	{ icon: TextAlignCenterIcon, align: "center" },
	{ icon: TextAlignEndIcon, align: "right" },
	{ icon: TextAlignJustifyIcon, align: "justify" },
];

const handleOffset = computed(() => {
	const { width: w, height: h } = p.dimensions

	switch (data.type) {
		case 'start':
		case 'process':
		case 'circle':
		case 'instorage':
		case 'preprocess':
		case 'loop-limit':
		case 'delay':
		case 'display':
		case 'offpage':
		case 'prep':
		case 'decision':
		case 'db':
			return { top: 0, right: 0, bottom: 0, left: 0 }
		case 'io': {
			const s = w * 0.05
			return { top: 0, right: s, bottom: 0, left: s }
		}
		case 'doc':
			return { top: 0, right: 0, bottom: h * 0.1, left: 0 }
		case 'multi-doc':
			return { top: 0, right: 0, bottom: h * 0.1, left: 0 }
		case 'loop': {
			const s = w * 0.075
			return { top: 0, right: s, bottom: 0, left: s }
		}
		case 'input': {
			const s = h * 0.15
			return { top: s, right: 0, bottom: 0, left: 0 }
		}
		case 'stored-data': {
			const r = w * 0.15
			return { top: 0, right: r, bottom: 0, left: 0 }
		}
		case 'direct-data': {
			const r = h / 2
			const wgap = Math.min(w * 0.15, r * 0.7)
			return { top: 0, right: wgap, bottom: 0, left: wgap }
		}
		case 'merge':
			return { top: 0, right: w * 0.25, bottom: 0, left: w * 0.25 }
		default:
			return { top: 0, right: 0, bottom: 0, left: 0 }
	}
})

let isConnectionClose = computed(() => {
	const mouse = flow.screenToFlowCoordinate(conn.position.value);
	const onX = mouse.x > p.position.x - gap && mouse.x < p.position.x + p.dimensions.width + gap;
	const onY = mouse.y > p.position.y - gap && mouse.y < p.position.y + p.dimensions.height + gap;
	return onX && onY
})


let fillAttr = computed<string | undefined>({
	get() { return data.attr.fillColor ?? '#ffffff' },
	set(v) {
		if (v == '' || !v) return
		flow.updateNodeData<ShapeProps>(p.id, n => ({
			attr: { ...n.data.attr, fillColor: v }
		}))
	}
})

let strokeColorAttr = computed<string | undefined>({
	get() { return data.attr.strokeColor ?? '#ffffff' },
	set(v) {
		if (v == '' || !v) return
		flow.updateNodeData<ShapeProps>(p.id, n => ({
			attr: { ...n.data.attr, strokeColor: v }
		}))
	}
})

let borderWidth = computed<string>({
	get() { return data.attr.strokeWidth.toString() },
	set(v) {
		if (v == '') return
		flow.updateNodeData<ShapeProps>(p.id, n => ({
			attr: { ...n.data.attr, strokeWidth: clamp(parseInt(v), 0, 20) }
		}))
	}
})
let textSize = computed<string>({
	get() { return data.attr.textSize.toString() },
	set(v) {
		if (v == '') return
		flow.updateNodeData<ShapeProps>(p.id, n => ({
			attr: { ...n.data.attr, textSize: clamp(parseInt(v), 0, 50) }
		}))
	}
})

</script>

<template>
<NodeResizer :isVisible="p.selected" />
<NodeToolbar
	class="bg-base-100  rounded-md p-1 shadow-lg border dark:border-zinc-600 border-zinc-300 flex md:flex-row flex-col gap-1 items-center"
	:offset="30 * flow.viewport.value.zoom"
	:position="Position.Right"
	:is-visible="!flow.connectionStartHandle.value && p.selected && flow.getSelectedNodes.value.length == 1"
>
	<label
		:for="`toolbar-fill-input-${p.id}`"
		class="rounded-full size-8 bg-size-[1.5rem]!"
		:style="{
			background: data.attr.fillColor ?? `url(${noBgImage})`
		}"
	></label>
	<input
		type="color"
		class="opacity-0 size-0"
		v-model="fillAttr"
		:id="`toolbar-fill-input-${p.id}`"
	>
	<label
		:for="`toolbar-stroke-input-${p.id}`"
		class="rounded-full size-8 bg-size-[1.5rem]! p-1"
		:style="{
			background: data.attr.strokeColor ?? `url(${noBgImage})`
		}"
	>
		<div class="rounded-full size-full bg-base-100"></div>
	</label>
	<input
		type="color"
		class="opacity-0 size-0"
		v-model="strokeColorAttr"
		:id="`toolbar-stroke-input-${p.id}`"
	>
	<LucideSquareRoundCorner class="size-4.5" />
	<div class="flex items-center justify-center input w-8 px-0 input-sm outline-none">
		<input
			id="toolbar-stroke-width-input"
			class="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			type="number"
			max="20"
			min="0"
			v-model="borderWidth"
		/>
	</div>
	<LucideType class="size-4.5" />
	<div class="flex items-center justify-center input w-8 px-0 input-sm outline-none">
		<input
			id="toolbar-fontsize-input"
			class="text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
			type="number"
			max="20"
			min="0"
			v-model="textSize"
		/>
	</div>
	<div class="flex md:flex-row flex-col gap-1 justify-center">
		<button
			v-for="d in textAlignData"
			:key="d.align"
			@click="e =>
				flow.updateNodeData<ShapeProps>(id, n => ({
					attr: { ...n.data.attr, textAlign: d.align }
				}))
			"
			class="rounded-md p-1.5 cursor-pointer"
			:class="data.attr.textAlign == d.align
				? 'bg-base-content/20'
				: 'hover:bg-base-content/10'
				"
		>
			<component
				:is="d.icon"
				class="size-4.5"
			/>
		</button>
	</div>
</NodeToolbar>

<div
	:id="`node-input-${p.id}`"
	class="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 outline-none"
	:class="{
		'nodrag nopan': p.selected
	}"
	contenteditable
	:style="{
		maxWidth: `${p.dimensions.width}px`,
		fontSize: `${data.attr.textSize}px`,
		textAlign: data.attr.textAlign
	} as CSSProperties"
	@blur="e => {
		flow.updateNodeData<ShapeProps>(p.id, n => ({
			attr: { ...n.data.attr, text: (e.target as HTMLElement).innerText! }
		}))
	}"
>
	{{ data.attr.text }}
</div>

<Shapes
	:dimensions="p.dimensions"
	:attr="data.attr"
	:type="data.type"
/>

<ShapeHandle
	:offset="handleOffset"
	:show-arrow="data.hovered && !conn.startHandle.value && !p.resizing && !p.dragging"
	:show-handle="isConnectionClose"
/>
</template>
