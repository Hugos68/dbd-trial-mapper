<script lang="ts">
	import '../app.css';
	import { HomeIcon, MapIcon, PlusCircleIcon, SettingsIcon, XIcon } from '@lucide/svelte';
	import { page } from '$app/state';

	const { children } = $props();

	const routes = [
		{
			label: 'Home',
			href: '/',
			Icon: HomeIcon
		},
		{
			label: 'Join Lobby',
			href: '/join-lobby',
			Icon: MapIcon
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
		},
	] as const;

	const title = $derived(routes.find(route => route.href === page.url.pathname)?.label);
</script>

<div class="grow flex flex-col">
	<header data-tauri-drag-region class="flex justify-between items-center gap-2 p-4">
		<div class="flex items-center gap-2">
			<MapIcon />
			<div class="grid">
				<span class="font-bold">Trial Sync</span>
				<span class="text-neutral-500 text-xs">User ID: {page.data.user.id}</span>
			</div>
		</div>
		<button class="cursor-pointer hover:bg-red-500/50 p-2 rounded" onclick={close}><XIcon /></button>
	</header>   
	<div class="grow flex p-4 gap-4">
		<aside class="bg-neutral-100 dark:bg-neutral-900 rounded p-4 flex flex-col justify-between">
			<nav class="flex flex-col gap-2 h-full">
				{#each routes as route (route)}
					{@const active = route.href === page.url.pathname}
					<a aria-current={active && "page"} class="py-2 px-4 hover:bg-neutral-500/50 [&[aria-current=page]]:bg-neutral-500/50 rounded flex gap-4 items-center last:mt-auto whitespace-nowrap" href={route.href}>
						<route.Icon />
						<span class="font-semibold">{route.label}</span>
					</a>
				{/each}
			</nav>
		</aside>
		<main class="bg-neutral-100 dark:bg-neutral-900 grow rounded p-4 grid gap-2">
			<h1 class="text-2xl font-semibold">{title}</h1>
			{@render children()}
		</main>
	</div>
</div>

