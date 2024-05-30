import { getPokedex } from '$lib/helpers';

export function load({ params }) {
	return { pokedex: getPokedex() };
}
