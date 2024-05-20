<script lang="ts">
	import { onMount } from 'svelte';
	import StatBar from '$lib/components/StatBar.svelte';
	import WeaknessGrid from '$lib/components/WeaknessGrid.svelte';
	import Type from '$lib/components/TypeDisplay.svelte';
	import type { Stats } from '$lib/types/Stats';

	export let data;

	let keys: Array<keyof Stats> = Object.keys(data.pokemon.stats) as Array<keyof Stats>;

	onMount(async () => {
		console.log(data.pokemon);
	});
</script>

<main>
	<section>
		<article>
			<div>
				<img src={data.pokemon.sprite} alt={data.pokemon.name} />
				<div class="type-container">
					{#each Object.keys(data.pokemon.type) as type}
						<Type {type} />
					{/each}
				</div>
			</div>
			<div class="stats">
				{#each keys as stat}
					<article>
						<StatBar
							statName={stat}
							stat={data.pokemon.stats[stat]}
							max={200}
							color={stat + 'Color'}
						/>
					</article>
				{/each}
			</div>
		</article>
		<article>
			<WeaknessGrid pokemon={data.pokemon} />
		</article>
	</section>
</main>

<style lang="scss">
	@import url('/colors.css');
	main {
		color: black;
		background-color: white;
		border-radius: 20px;
		width: 55vw;
		margin: 5vw 20vw 0;
		section {
			padding: 2% 2%;
			> article {
				display: flex;
				flex-direction: row;
				align-items: center;
				img {
					width: 20vw;
					height: 20vw;
				}
				.stats {
					display: flex;
					flex-direction: column;
					width: 50%;
					margin: 0% 5%;
					padding-top: 3%;
					> article {
						article {
							display: flex;
							flex-direction: row;
							height: 2vw;
						}
					}
				}
			}
		}
	}
	.type-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		justify-content: center;
	}
</style>
