import type { Stats } from '$lib/types/Stats';
import type { Type } from '$lib/types/Type';
import type { Types } from '$lib/types/Types';

export interface Pokemon {
	name: string;
	sprite: string;
	type: Types;
	stats: Stats;
	abilities: any;
	male: number;
}
