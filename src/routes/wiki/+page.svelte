<script lang="ts">
	import PokemonCard from '$lib/components/PokemonCard.svelte';
	import type { Pokemon } from '$lib/types/Pokemon';
	export let data: { pokedex: Pokemon[] };
</script>

<section>
	<article>
		{#each data.pokedex as pokemon}
			<PokemonCard {pokemon} />
		{/each}
	</article>
</section>

<style lang="scss">
	section {
		padding: 10vh 25vw;
		article {
			background-color: white;
			height: 65vh;
			width: 50vw;
			border-radius: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: black;
			flex-wrap: wrap;
		}
	}
</style>
