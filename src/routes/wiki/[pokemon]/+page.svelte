<script lang="ts">
	import { onMount } from 'svelte';
	import type { Pokemon } from '$lib/types/Pokemon';
	import StatBar from '$lib/components/StatBar.svelte';
	import type { Stats } from '$lib/types/Stats';

	export let data;

  let keys: Array<keyof Stats> = Object.keys(data.pokemon.stats) as Array<keyof Stats>

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
					{#each data.pokemon.type as type}
						<div style="background-color: var(--{type});" class="type">{type}</div>
					{/each}
				</div>
			</div>
			<div class="weakness"></div>
		</article>
		<article>
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
	</section>
</main>

<style lang="scss">
	@import url('/colors.css');
	main {
		color: black;
		background-color: white;
		border-radius: 20px;
		width: 60vw;
		height: 50vw;
		margin: 5vw 20vw 0;
		section {
			padding-top: 2%;
			> article {
				display: flex;
				flex-direction: row;
				align-items: center;
				img {
					width: 20vw;
					height: 20vw;
				}
				.weakness {
					display: grid;
					grid-template-columns: auto auto auto;
					background-color: #2196f3;
					padding: 10px;
					> div {
						background-color: rgba(255, 255, 255, 0.8);
						border: 1px solid rgba(0, 0, 0, 0.8);
						padding: 20px;
						font-size: 30px;
						text-align: center;
					}
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
		.type {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 20px;
			width: 8vw;
			height: 2vw;
			border: 3px solid black;
		}
	}
</style>
