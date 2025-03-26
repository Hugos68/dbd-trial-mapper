<script lang="ts">
    import { supabase } from "$lib/supabase";
    import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
    import { openUrl } from '@tauri-apps/plugin-opener';
    import type { Provider } from "@supabase/supabase-js";
  
    const providers: Provider[] = ['google'];
    
    async function login_with_provider(provider: Provider) {
      const oauth_response = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          skipBrowserRedirect: true,
          redirectTo: 'dbd-trial-mapper://url',
        }
      });
      if (oauth_response.error) {
        throw new Error(oauth_response.error.message);
      }
      await openUrl(oauth_response.data.url);
      await onOpenUrl(async (urls) => {
        const url = urls.at(0);
        if (!url) {
          throw new Error('No URL found');
        }
        const code = new URL(url).searchParams.get('code');
        if (!code) {
          throw new Error('No code found');
        }
        const exchange_response = await supabase.auth.exchangeCodeForSession(code);
        if (exchange_response.error) {
          throw new Error(exchange_response.error.message);
        }
      });
    }
  </script>
  
  {#each providers as provider}
    <button class="btn preset-filled capitalize" onclick={() => login_with_provider(provider)}>{provider}</button>
  {/each}