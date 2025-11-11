<script setup lang="ts">
import ShapeNode from '@/comp/ShapeNode.vue';
import Shapes from '@/comp/Shapes.vue';
import { db, type Project } from '@/core/db';
import { scaleToMax, templates } from '@/core/ShapeTemplate';
import router from '@/router';
import { ShapeAttr, ShapeProps } from '@/types/ShapeProps';
import { Background } from '@vue-flow/background';
import { ConnectionLineType, isNode, Panel, useKeyPress, useVueFlow, VueFlow, type Dimensions, type Node, type NodeTypesObject, type XYPosition } from '@vue-flow/core';
import { HomeIcon, MaximizeIcon, ShapesIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-vue-next';
import { nanoid } from 'nanoid';
import { markRaw, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const flow = useVueFlow()

const addNode = (type: string, size: Dimensions, p?: XYPosition) => {
	let windowSize = {
		x: p?.x ?? (window.innerWidth / 2 - (size.width as number)),
		y: p?.y ?? (window.innerHeight / 2 - (size.height as number))
	}
	const position = flow.screenToFlowCoordinate(windowSize);

	flow.addNodes({
		id: nanoid(10),
		position,
		type: 'shape',
		width: size.width,
		height: size.height,
		data: new ShapeProps({ type })
	})
}

const saveData = async () => {
	const content = JSON.stringify({
		nodes: flow.nodes.value.map(v => ({
			...v, selected: false,
			data: {
				...v.data, hovered: false
			}
		})),
		edges: flow.edges.value.map(v => ({
			...v, selected: false,
		}))
	})

	if (content) {
		await db.projects.update(project.value!.id, { content });
	} else {
		alert("failed to save, Data corrupted");
		await router.push(`/`);
	}

}

flow.onConnect(c => flow.addEdges(c))
flow.onNodeMouseEnter(({ node }) => flow.updateNodeData(node.id, d => ({ hovered: true })))
flow.onNodeMouseLeave(({ node }) => flow.updateNodeData(node.id, d => ({ hovered: false })))
flow.onEdgesChange(saveData)
flow.onNodesChange(saveData)

const nodeTypes: NodeTypesObject = {
	shape: markRaw(ShapeNode)
}

const selectAll = () => {
	flow.setNodes((nodes) => nodes.map((n) => ({ ...n, selected: true })));
	flow.setEdges((edges) => edges.map((e) => ({ ...e, selected: true })));
};

const copy = async () => {
	await navigator.clipboard.writeText(JSON.stringify(flow.getSelectedNodes.value));
};

const paste = async () => {
	const res = await navigator.clipboard.readText();
	const copied: Node[] = JSON.parse(res);
	flow.setNodes(nodes => nodes.map(n => ({ ...n, selected: false })))
	for (const copy of copied) {
		if (!isNode(copy)) return
		flow.addNodes({
			...copy,
			id: nanoid(10),

			position: {
				x: copy.position.x + 10,
				y: copy.position.y + 10,
			},
		} as Node)

	}
	copy()
};

watch(useKeyPress('Control+a', { actInsideInputWithModifier: false }), (v) => { if (v) selectAll() })
watch(useKeyPress('Control+c', { actInsideInputWithModifier: false }), (v) => { if (v) copy() })
watch(useKeyPress('Control+v', { actInsideInputWithModifier: false }), (v) => { if (v) paste() })

const onDragOver = (e: Event) => e.preventDefault()
let draggedShapeData = ref<typeof templates[number] | null>()
const onDrop = (e: MouseEvent) => {
	e.preventDefault();
	if (draggedShapeData.value) {
		const { type, ...size } = draggedShapeData.value
		addNode(type, size, { x: e.clientX, y: e.clientY });
	}
}

const route = useRoute()
let project = ref<Project>()

onMounted(async () => {
	project.value = await db.projects.get(route.params.id as string)

	if (!project.value) {
		alert('project gk ketemu')
		await router.push(`/`);
		return
	}

	const { nodes, edges } = JSON.parse(project.value.content)
	flow.setNodes(nodes)
	flow.setEdges(edges)
});

const focusNodeInput = () => {
	const el = document.querySelector(`#node-input-${flow.getSelectedNodes.value[0]!.id}`) as HTMLInputElement
	el.focus()
}
</script>

<template>
<div class="h-dvh w-dvw">
	<VueFlow
		:nodeTypes="nodeTypes"
		:delete-key-code="['Backspace', 'Delete']"
		:multi-selection-key-code="['Shift', 'Control']"
		:connection-line-type="ConnectionLineType.SmoothStep"
		:default-edge-options="{ type: 'smoothstep' }"
		:pan-on-drag="[1, 2]"
		:selection-key-code="true"
		@node-double-click="focusNodeInput"
		@dragover="onDragOver"
		@drop="onDrop"
		:max-zoom="5"
	>
		<Background class="bg-base-300!" />
		<Panel
			v-if="project"
			position="bottom-center"
			class="bg-base-100 md:top-1/2! md:h-fit md:-translate-y-1/2 md:left-4! md:flex-col rounded-md p-1 shadow-lg border dark:border-zinc-600 border-zinc-300 flex gap-1"
		>
			<div
				tabindex="0"
				class="aspect-square cursor-pointer relative group"
			>
				<p class="size-8 p-1.5 rounded hover:bg-base-300">
					<ShapesIcon class="size-5" />
				</p>
				<div
					class="border dark:border-zinc-600 border-zinc-300 bg-base-100 rounded-md gap-1 p-1 shadow-lg group-focus-within:grid hidden grid-cols-[repeat(4,max-content)] absolute md:left-[140%] md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0 bottom-[140%] left-1/2 -translate-x-1/2"
				>
					<button
						v-for="{ type, ...size } in templates"
						:draggable="true"
						@dragstart="() => draggedShapeData = { type, ...size }"
						@dragend="() => draggedShapeData = null"
						@click="() => addNode(type, size)"
						:class="{ 'hover:bg-base-300': !draggedShapeData }"
						class="flex justify-center fill-base-200 cursor-pointer items-center aspect-square p-0.5 bg-transparent rounded"
					>
						<Shapes
							:type="type"
							:dimensions="scaleToMax(size, 32)"
							:attr="new ShapeAttr()"
						/>
					</button>
				</div>
			</div>
			<button
				@click="async () => flow.fitView()"
				class="aspect-square cursor-pointer p-1.5 rounded hover:bg-base-300"
			>
				<MaximizeIcon class="size-5" />
			</button>
			<button
				@click="async () => flow.zoomIn()"
				class="aspect-square cursor-pointer p-1.5 rounded hover:bg-base-300"
			>
				<ZoomInIcon class="size-5" />
			</button>
			<button
				@click="async () => flow.zoomOut()"
				class="aspect-square cursor-pointer p-1.5 rounded hover:bg-base-300"
			>
				<ZoomOutIcon class="size-5" />
			</button>
			<button
				@click="() => router.push('/')"
				class="aspect-square cursor-pointer p-1.5 rounded hover:bg-base-300"
			>
				<HomeIcon class="size-5" />
			</button>
		</Panel>
	</VueFlow>
</div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/node-resizer/dist/style.css';
</style>