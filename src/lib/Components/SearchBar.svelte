<script lang="ts">
	import type { Pokemon } from '$lib/types/Pokemon';
	import PopUp from './PopUp.svelte';

	export let pokedex: Pokemon[];

	let pokemon: Pokemon;
	let input: HTMLInputElement;
	let ul: HTMLDListElement;
	let popup: boolean = false;

	function filter() {
		let filter, list;
		let txtValue: string | null;

		list = ul.getElementsByTagName('li');
		Array.from(list).forEach((li) => {
			txtValue = li.textContent;
			filter = input.value.toUpperCase();
			if (txtValue && txtValue.toUpperCase().indexOf(filter) > -1) {
				li.style.display = '';
			} else {
				li.style.display = 'none';
			}
		});
	}

	function generate() {
		let temp: Pokemon | undefined;
		temp = pokedex.find((poke) => poke.name.toUpperCase() == input.value.toUpperCase());
		if (temp != undefined) {
			pokemon = temp;
			popup = true;
		}
	}

	function close() {
		popup = false;
	}
</script>

<input
	bind:this={input}
	type="text"
	on:keyup={filter}
	placeholder="Search for names.."
	title="Type in a name"
/>

<ul bind:this={ul}>
	{#each pokedex as pokemon}
		<li><button on:click={() => (input.value = pokemon.name)}>{pokemon.name}</button></li>
	{/each}
</ul>

<button on:click={generate}>generate</button>

{#if popup}
	<div class="popup">
		<button
			on:click={() => {
				popup = false;
				close();
			}}>close</button
		>
		<PopUp {pokemon} />
	</div>
{/if}

<style>
	* {
		box-sizing: border-box;
	}

	input {
		background-position: 10px 12px;
		background-repeat: no-repeat;
		width: 100%;
		font-size: 16px;
		padding: 12px 20px 12px 40px;
		border: 1px solid #ddd;
		margin-bottom: 12px;
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	ul li button {
		border: 1px solid #ddd;
		margin-top: -1px; /* Prevent double borders */
		background-color: #f6f6f6;
		padding: 12px;
		text-decoration: none;
		font-size: 18px;
		color: black;
		display: block;
	}

	.popup {
		position: fixed;
		z-index: 1;
		left: 10%;
		top: 10%;
		width: 80%;
		height: 80%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
	}
</style>
