import { createStore } from '@zag-js/toast';

export const toaster = createStore({
	placement: 'bottom',
	overlap: true,
	max: 3,
});
