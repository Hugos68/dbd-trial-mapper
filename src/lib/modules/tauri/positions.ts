export const POSITIONS = [
	'top-left',
	'top-right',
	'bottom-left',
	'bottom-right',
] as const;
export type Position = (typeof POSITIONS)[number];
