import type { Stats } from '$lib/types/Stats';

export interface Pokemon {
	name: string;
	sprite: string;
	type: string[];
	stats: Stats;
	abilities: any;
	male: number;
}
