<script lang="ts">
import Layout from "$lib/components/layout.svelte";
import { supabase } from "$lib/supabase/client";
import { error } from "@sveltejs/kit";
import * as v from "valibot";

const { data } = $props();

async function submitPreferences(event: SubmitEvent) {
	if (!(event.target instanceof HTMLFormElement)) {
		return;
	}
	event.preventDefault();
	const preference = v.parse(
		v.pipe(
			v.object({
				"window-position": v.picklist(["TOP_LEFT", "TOP_RIGHT"]),
				"window-width": v.pipe(
					v.string(),
					v.transform((input) => Number(input)),
					v.minValue(200),
					v.maxValue(1000),
				),
			}),
			v.transform((input) => {
				return {
					window_position: input["window-position"],
					window_width: input["window-width"],
				};
			}),
		),
		Object.fromEntries(new FormData(event.target)),
	);
	const updatePreference = await supabase
		.from("preference")
		.update(preference)
		.eq("user_id", data.user.id);
	if (updatePreference.error) {
		error(500, updatePreference.error.message);
	}
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