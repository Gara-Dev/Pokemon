import type { Pokemon } from '$lib/types/Pokemon';
import { getPokedex } from '$lib/helpers/';

export function load({ params }) {
	return {
		pokemon: getPokedex().find((poke: Pokemon) => {
			return poke.name.toUpperCase() == params.pokemon.toUpperCase();
		}) as Pokemon
	};
}
