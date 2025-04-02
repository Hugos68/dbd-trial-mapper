import * as v from 'valibot';
import { POSITIONS } from '../tauri/positions';

export const OverlaySettingsSchema = v.object({
	size: v.pipe(v.number(), v.minValue(100), v.maxValue(500)),
	opacity: v.pipe(v.number(), v.minValue(0), v.maxValue(100)),
	position: v.picklist(POSITIONS),
	visible: v.boolean(),
});

export type OverlaySettings = v.InferOutput<typeof OverlaySettingsSchema>;
