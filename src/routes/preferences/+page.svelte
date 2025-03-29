<script lang="ts">
import Layout from "$lib/components/layout.svelte";
import { supabase } from "$lib/supabase/client";

const { data } = $props();

async function submitPreferences(event: SubmitEvent) {
	event.preventDefault();
	if (!(event.target instanceof HTMLFormElement)) {
		return;
	}
	const formData = new FormData(event.target, event.submitter);
	const windowPosition = formData.get("window-position") as
		| "TOP_LEFT"
		| "TOP_RIGHT";
	const windowWidth = Number.parseInt(formData.get("window-width"));
	await supabase
		.from("preference")
		.update({ window_position: windowPosition, window_width: windowWidth })
		.eq("user_id", data.user.id);
}
</script>

<Layout>
    <form class="grid gap-2" onsubmit={submitPreferences}>
        <label class="label">
            <span class="label-text">Window Position</span>
            <select name="window-position" class="select ring">
                {#each ["TOP_LEFT", "TOP_RIGHT"] as position}
                    <option value={position} selected={data.preference.window_position === position}>
                        {position}
                    </option>
                {/each}
            </select>
        </label>
        <label class="label">
            <span class="label-text">Window Width</span>
            <input class="input" name="window-width" type="number" min="200" max="1000" value={data.preference.window_width}/>
        </label>
        <button class="btn preset-filled-primary-500">Save</button>
    </form>
</Layout>