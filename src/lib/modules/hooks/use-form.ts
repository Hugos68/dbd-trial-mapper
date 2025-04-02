import { superForm } from 'sveltekit-superforms';

export function useForm<
	T extends Record<string, unknown>,
	In extends Record<string, unknown> = T,
>(...params: Parameters<typeof superForm<T, In>>) {
	return superForm<T, In>(params[0], {
		SPA: true,
		...params[1],
	});
}
