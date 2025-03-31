<script lang="ts">
	import Button from "$lib/components/button.svelte";
	import Layout from "$lib/components/layout.svelte";
	import { useForm } from "$lib/modules/hooks/use-form.js";
	import { OverlaySettingsSchema } from "$lib/modules/schemas/overlay-settings-schema";
	import { overlaySettings } from "$lib/modules/ui/overlay-settings";
	import { toaster } from "$lib/modules/ui/toaster.js";
	import { valibot } from "sveltekit-superforms/adapters";

    const { data } = $props();

    const { form, errors, enhance, submitting } = useForm(data.form, {
        validators: valibot(OverlaySettingsSchema),
        async onUpdate(event) {
            if (!event.form.valid) {
                return;
            }
            overlaySettings.current.width = event.form.data["width"];
            overlaySettings.current.position = event.form.data["position"];
            toaster.success({
                title: 'Successfully updated settings',
            });
        },
    });
</script>

<Layout title="Settings" description="Configure your settings.">
    <form
        class="flex h-full flex-col gap-4"
        method="post"
        autocomplete="off"
        use:enhance
    >
        <label class="grid gap-1">
            <span class="text-sm">Overlay Width</span>
            <input
                type="number"
                class="rounded bg-transparent focus:aria-[invalid=true]:ring-red-500"
                bind:value={$form.width}
            />
            {#if $errors.width}
                <span class="text-sm text-red-500">{$errors.width.join(', ')}</span>
            {/if}
        </label>
        <label class="grid gap-1">
            <span class="text-sm">Overlay Position</span>
            <input
                type="number"
                class="rounded bg-transparent focus:aria-[invalid=true]:ring-red-500"
                bind:value={$form.position}
            />
            {#if $errors.position}
                <span class="text-sm text-red-500">{$errors.position.join(', ')}</span>
            {/if}
        </label>
        <Button class="mt-auto ml-auto" disabled={$submitting}>Save Settings</Button>
    </form>
</Layout>