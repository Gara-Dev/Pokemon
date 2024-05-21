import { getPokedex } from '$lib/helpers';
import type { Pokemon } from '$lib/types/Pokemon';

export function match(param) {
	return getPokedex().find((poke: Pokemon) => {
		return poke.name.toUpperCase() == param.toUpperCase();
	});
}
