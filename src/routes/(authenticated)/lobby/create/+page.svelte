<script lang="ts">
import { goto } from "$app/navigation";
import { create_lobby_schema } from "$lib/schemas/create-lobby.js";
import { supabase } from "$lib/supabase/client.js";
import { superForm } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

const { data } = $props();

const { form, constraints, enhance } = superForm(data.form, {
	SPA: true,
	validators: valibot(create_lobby_schema),
	async onUpdate(event) {
		if (event.result.type === "success") {
			const insert_lobby_response = await supabase
				.from("lobby")
				.insert(event.form.data);
			if (insert_lobby_response.error) {
				throw new Error(insert_lobby_response.error.message);
			}
			await goto("/");
		}
	},
});
</script>


<h1 class="h1">Create Lobby</h1>

<form class="grid gap-2" method="POST" use:enhance>
    <label>
        <span>Access</span>
        <select class="select" bind:value={$form.access} {...$constraints.access}>
            <option>private</option>
            <option>public</option>
        </select>   
    </label>
    <button class="btn preset-filled">Create Lobby</button>
</form>
