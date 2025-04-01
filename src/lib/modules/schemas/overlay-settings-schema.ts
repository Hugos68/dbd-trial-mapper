import { Position } from '@tauri-apps/plugin-positioner';
import * as v from 'valibot';

export const OverlaySettingsSchema = v.object({
	size: v.pipe(v.number(), v.minValue(100), v.maxValue(500)),
	opacity: v.pipe(v.number(), v.minValue(1), v.maxValue(100)),
	position: v.enum(Position),
	visible: v.boolean(),
});

export type OverlaySettings = v.InferOutput<typeof OverlaySettingsSchema>;
