<script lang="ts">
import { login_with_provider } from "$lib/supabase/login-with-provider";
import type { Provider } from "@supabase/supabase-js";

const providers: Provider[] = ["google"];
</script>
  
{#each providers as provider}
	<button class="btn preset-filled capitalize" onclick={() => login_with_provider(provider)}>{provider}</button>
{/each}

