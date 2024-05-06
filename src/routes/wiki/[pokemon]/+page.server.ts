import type { Pokemon } from '$lib/types/Pokemon';
import fs from 'fs';
import path from 'path';

export function load({ params }) {
	const res = fs.readFileSync(path.resolve(path.join('static', 'pokedex.json')), 'utf-8');

	return {
		pokemon: JSON.parse(res.toString()).find((poke: Pokemon) => {
			return poke.name.toUpperCase() == params.pokemon.toUpperCase();
		}) as Pokemon
	};
}
