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
		}
	] as const;

	const title = $derived(routes.find((route) => route.href === page.url.pathname)?.label);
</script>

<div class="flex grow flex-col">
	<header data-tauri-drag-region class="flex items-center justify-between gap-2 p-4">
		<div class="flex items-center gap-2">
			<MapIcon />
			<div class="grid">
				<span class="font-bold">Trial Sync</span>
				<span class="text-xs text-neutral-500">User ID: {page.data.user.id}</span>
			</div>
		</div>
		<button class="cursor-pointer rounded p-2 hover:bg-red-500/50" onclick={close}><XIcon /></button
		>
	</header>
	<div class="flex grow gap-4 p-4">
		<aside class="flex flex-col justify-between rounded bg-neutral-100 p-4 dark:bg-neutral-900">
			<nav class="flex h-full flex-col gap-2">
				{#each routes as route (route)}
					{@const active = route.href === page.url.pathname}
					<a
						aria-current={active && 'page'}
						class="flex items-center gap-4 rounded px-4 py-2 whitespace-nowrap last:mt-auto hover:bg-neutral-500/50 [&[aria-current=page]]:bg-neutral-500/50"
						href={route.href}
					>
						<route.Icon />
						<span class="font-semibold">{route.label}</span>
					</a>
				{/each}
			</nav>
		</aside>
		<main class="grid grow gap-2 rounded bg-neutral-100 p-4 dark:bg-neutral-900">
			<h1 class="text-2xl font-semibold">{title}</h1>
			{@render children()}
		</main>
	</div>
</div>
