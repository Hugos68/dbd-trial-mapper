import type { Provider } from "@supabase/supabase-js";
import { supabase } from "./client";
import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
import { openUrl } from "@tauri-apps/plugin-opener";
import { invalidateAll } from "$app/navigation";
import { getCurrentWindow } from "@tauri-apps/api/window";

export async function loginWithProvider(provider: Provider) {
	const oauth_response = await supabase.auth.signInWithOAuth({
		provider: provider,
		options: {
			skipBrowserRedirect: true,
		},
	});
	if (oauth_response.error) {
		throw new Error(oauth_response.error.message);
	}
	await openUrl(oauth_response.data.url);
	const unlisten = await onOpenUrl(async (urls) => {
		const url = urls.at(0);
		if (!url) {
			throw new Error("No URL found");
		}
		const code = new URL(url).searchParams.get("code");
		if (!code) {
			throw new Error("No code found");
		}
		const exchange_response = await supabase.auth.exchangeCodeForSession(code);
		if (exchange_response.error) {
			throw new Error(exchange_response.error.message);
		}
		await invalidateAll();
		unlisten();
		await getCurrentWindow().setFocus();
	});
}