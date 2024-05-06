<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { onMount } from 'svelte';
	import type { Pokemon } from '$lib/types/Pokemon';

	let pokedex: Pokemon[];

	onMount(async () => {
		const res = await fetch('/pokedex.json');

		if (res.ok) {
			pokedex = await res.json();
		}
	});
</script>

{#if pokedex}
	<SearchBar {pokedex} />
{/if}
