import type { Stats } from '$lib/types/Stats';
import type { Type } from '$lib/types/Type';
import type { Types } from '$lib/types/Types';
import type { Abilities } from './Abilities';
import type { Move } from './Move';

export interface Pokemon {
	name: string;
	sprite: string;
	type: Types;
	stats: Stats;
	abilities: Abilities;
	male: number;
	description: stirng;
  moves: Move[]
}
