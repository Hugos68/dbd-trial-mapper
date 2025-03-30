<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	import { HomeIcon, JoystickIcon, MapIcon, PlusCircleIcon, PlusIcon, SettingsIcon } from '@lucide/svelte';
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
</script>

<div class="grow flex flex-col">
	<Header></Header>
	<div class="grow flex p-4 gap-4">
		<aside class="bg-neutral-100 dark:bg-neutral-900 rounded p-4 flex flex-col justify-between">
			<nav class="flex flex-col gap-2 h-full">
				{#each routes as route (route)}
					{@const active = route.href === page.url.pathname}
					<a aria-current={active && "page"} class="py-2 px-4 hover:bg-neutral-500/50 [&[aria-current=page]]:bg-neutral-500/50 rounded flex gap-4 items-center last:mt-auto" href={route.href}>
						<route.Icon />
						<span class="font-semibold">{route.label}</span>
					</a>
				{/each}
			</nav>
		</aside>
		<main class="bg-neutral-100 dark:bg-neutral-900 grow rounded p-4">
			{@render children()}
		</main>
	</div>
</div>
