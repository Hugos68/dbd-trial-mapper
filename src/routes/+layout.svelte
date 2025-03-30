<script lang="ts">
	import '../app.css';
	import { MapIcon, MergeIcon, PlusCircleIcon, SettingsIcon, XIcon } from '@lucide/svelte';
	import { page } from '$app/state';

	const { children } = $props();

	const routes = [
		{	
			label: 'Join Lobby',
			href: '/join-lobby',
			Icon: MergeIcon
		},
		{
			label: 'Create Lobby',
			href: '/create-lobby',
			Icon: PlusCircleIcon
		},
		{
			label: 'Settings',
			href: '/settings',
			Icon: SettingsIcon
		}
	] as const;

	const title = $derived(routes.find((route) => route.href === page.url.pathname)?.label);
</script>

<div class="grow flex flex-col">
	<header data-tauri-drag-region class="flex items-center justify-between rounded p-4">
		<div class="flex items-center gap-4">
			<MapIcon />
			<div class="grid">
				<span class="font-bold">Trial Sync</span>
				<span class="text-xs text-neutral-500">User ID: {page.data.user.id}</span>
			</div>
		</div>
		<div class="flex gap-2">
			<button class="cursor-pointer rounded p-2 hover:bg-red-500/50" onclick={close}><XIcon /></button>
		</div>
	</header>
	<div class="grow flex gap-4 p-4 pt-0">
		<aside class="flex flex-col justify-between rounded  p-4 bg-neutral-100 dark:bg-neutral-900">
			<nav class="flex h-full flex-col gap-2">
				{#each routes as route (route)}
					{@const active = route.href === page.url.pathname}
					<a
						aria-current={active && 'page'}
						class="flex justify-between gap-8 rounded px-4 py-2 whitespace-nowrap last:mt-auto hover:bg-neutral-500/50 [&[aria-current=page]]:bg-neutral-500/50"
						href={route.href}
					>
						<route.Icon />
						<span class="font-semibold">{route.label}</span>
					</a>
				{/each}
			</nav>
		</aside>
		<main class="flex grow flex-col gap-2 rounded bg-neutral-200 p-4 dark:bg-neutral-800">
			<h1 class="text-2xl font-semibold">{title}</h1>
			<hr />
			<div>
				{@render children()}
			</div>
		</main>
	</div>

</div>
