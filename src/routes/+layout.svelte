<script lang="ts">
	import '../app.css';
	import {
		HomeIcon,
		MapIcon,
		MergeIcon,
		PlusCircleIcon,
		SettingsIcon,
		XIcon
	} from '@lucide/svelte';
	import { page } from '$app/state';
	import { close } from '$lib/modules/tauri/window/close';
	import Toaster from '$lib/components/toaster.svelte';

	const { children, data } = $props();

	const navigationItems = $derived.by(() => {
		const items = [
			{
				label: 'Home',
				Icon: HomeIcon,
				attributes: {
					href: '/'
				}
			}
		];
		if (data.lobby) {
			items.push({
				label: 'Lobby',
				Icon: MapIcon,
				attributes: {
					href: '/lobby'
				}
			});
		} else {
			items.push({
				label: 'Join Lobby',
				Icon: MergeIcon,
				attributes: {
					href: '/join-lobby'
				}
			});
			items.push({
				label: 'Create Lobby',
				Icon: PlusCircleIcon,
				attributes: {
					href: '/create-lobby'
				}
			});
		}
		items.push({
			label: 'Settings',
			Icon: SettingsIcon,
			attributes: {
				href: '/settings'
			}
		});
		return items;
	});

	const title = $derived.by(() => {
		const route = page.url.pathname.split('/').pop();
		if (!route) {
			return 'Home';
		}
		return route
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	});
</script>

<Toaster />

<div class="flex grow flex-col">
	<header data-tauri-drag-region class="flex items-center justify-between rounded p-4">
		<div class="flex items-center gap-4">
			<MapIcon />
			<div class="grid">
				<span class="font-bold">Trial Sync</span>
				<span class="text-xs text-neutral-500">User ID: {page.data.user.id}</span>
			</div>
		</div>
		<div class="flex gap-2">
			<button class="rounded p-2 transition-colors hover:bg-red-500/50" onclick={close}
				><XIcon /></button
			>
		</div>
	</header>
	<div class="flex grow gap-4 px-4 pb-4">
		<aside
			class="flex w-64 flex-col justify-between rounded bg-neutral-100 p-4 dark:bg-neutral-900"
		>
			<nav class="flex grow flex-col gap-2">
				{#each navigationItems as navigation (navigation)}
					{@const active = navigation.attributes.href === page.url.pathname}
					<a
						class="flex items-center justify-between gap-8 rounded px-4 py-2 whitespace-nowrap transition-colors last:mt-auto {active
							? 'bg-neutral-500/50'
							: ''} hover:bg-neutral-500/50"
						{...navigation.attributes}
					>
						<span class={active ? 'font-bold' : 'font-semibold'}>{navigation.label}</span>
						<navigation.Icon class="size-5" />
					</a>
				{/each}
			</nav>
		</aside>
		<main class="flex grow flex-col gap-2 rounded bg-neutral-200 p-4 dark:bg-neutral-800">
			<h1 class="text-2xl font-semibold">{title}</h1>
			<hr />
			<div class="grow">
				{@render children()}
			</div>
		</main>
	</div>
</div>
