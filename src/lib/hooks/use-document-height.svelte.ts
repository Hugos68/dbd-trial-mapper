import { ElementRect } from "runed";

export function useDocumentHeight() {
	const documentRect = new ElementRect(() => document.documentElement);
	const height = $derived(documentRect.current.height);
	return {
		get current() {
			return height;
		},
	};
}
