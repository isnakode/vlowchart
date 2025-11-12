<script setup lang="ts">
import { db, type Project } from '@/core/db';
import { LucideShapes, Trash2Icon } from 'lucide-vue-next';
import { nanoid } from 'nanoid';
import { computed, onMounted, ref } from 'vue';

let projects = ref<Project[]>([])

const addProject = async () => {
	await db.projects.add({
		id: nanoid(),
		title: 'untitled',
		content: JSON.stringify({ nodes: [], edges: [] }),
		last_edited: new Date(),
	});
	await getProjects()
}
const getProjects = async () => projects.value = await db.projects.toArray()
onMounted(getProjects)

let query = ref('')
let filteredProject = computed(() => {
	if (query.value == '') {
		return projects.value
	}
	return projects.value.filter(p => p.title.toLowerCase().includes(query.value.toLowerCase()))
})
</script>

<template>
<main class="flex flex-col h-dvh ">
	<div class="flex xl:px-8 px-4 py-4 gap-2 items-center sticky top-0 bg-base-100">
		<input
			type="search"
			class="input me-auto"
			placeholder="Search project"
			v-model="query"
		/>

		<button
			class="btn btn-primary"
			@click="addProject"
		>
			Create
		</button>
	</div>
	<div
		v-if="projects.length == 0"
		class="grow flex items-center justify-center"
	>
		You don't have any project yet
	</div>
	<div
		v-else-if="filteredProject.length == 0"
		class="grow flex items-center justify-center"
	>
		No "{{ query }}" project found
	</div>

	<div
		v-else-if="filteredProject.length > 0"
		class="grid grid-cols-2 md:grid-cols-4 gap-4 xl:px-8 px-4"
	>
		<div
			v-for="p in filteredProject"
			:key="p.id"
			class="rounded-lg group flex flex-col border border-gray-600 w-full"
		>
			<router-link
				:to="`/editor/${p.id}`"
				class="h-40 bg-gray-400 rounded-t-lg flex items-center justify-center text-base-100"
			>
				<LucideShapes class="size-1/2" />
			</router-link>
			<div class="flex p-3 gap-1 justify-between">
				<form @submit.prevent="async (e) => {
					await db.projects.update(p.id, {
						title: (e.target as HTMLElement).querySelector('input')!.value
					});
					(e.target as HTMLFormElement).querySelector('input')?.blur()
				}">
					<input
						type="text"
						class="outline-none flex-1 w-full"
						:value="p.title"
						@blur="async e => {
							await db.projects.update(p.id, {
								title: (e.currentTarget as HTMLInputElement).value
							});
						}"
					>
				</form>
				<button
					class="self-center group/icon flex-none"
					@click.prevent.stop="async (e) => {
						e.preventDefault();
						await db.projects.delete(p.id);
						await getProjects()
					}"
				>
					<Trash2Icon class="group-hover:block hidden group-hover/icon:text-red-400 size-4 cursor-pointer" />
				</button>
			</div>
		</div>
	</div>
</main>
</template>