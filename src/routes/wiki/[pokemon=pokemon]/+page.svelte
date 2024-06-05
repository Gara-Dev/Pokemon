<script lang="ts">
	import { onMount } from 'svelte';
	import StatBar from '$lib/components/StatBar.svelte';
	import WeaknessGrid from '$lib/components/WeaknessGrid.svelte';
	import AbilityDisplay from '$lib/components/AbilityDisplay.svelte';
	import Type from '$lib/components/TypeDisplay.svelte';
	import type { Stats } from '$lib/types/Stats';
	import PokemonDescription from '$lib/components/PokemonDescription.svelte';

	export let data;

	let keys: Array<keyof Stats> = Object.keys(data.pokemon.stats) as Array<keyof Stats>;

	onMount(async () => {
		console.log(data.pokemon);
	});
</script>

<div class="container">
	<div class="sub-container">
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
						{#if stat == 'Tot'}
							<article>
								<StatBar
									statName={stat}
									stat={data.pokemon.stats[stat]}
									max={200}
									color={stat + 'Color'}
									tot={true}
								/>
							</article>
						{:else}
							<article>
								<StatBar
									statName={stat}
									stat={data.pokemon.stats[stat]}
									max={200}
									color={stat + 'Color'}
								/>
							</article>
						{/if}
					{/each}
					<div class="ability-container">
						<AbilityDisplay ability={data.pokemon.abilities.ability1.name} />
						{#if data.pokemon.abilities.ability2}
							<AbilityDisplay ability={data.pokemon.abilities.ability2.name} />
						{/if}
						{#if data.pokemon.abilities.hidden}
							<AbilityDisplay ability={data.pokemon.abilities.hidden.name} hidden={true} />
						{/if}
					</div>
				</div>
			</article>
			<article>
				<WeaknessGrid pokemon={data.pokemon} />
			</article>
      <PokemonDescription description = {data.pokemon.description}/>
		</section>
	</div>
</div>

<style lang="scss">
	@import url('/colors.css');
	.container {
		padding: 6vh 22.5vw;
		width: 55vw;
		.sub-container {
			min-height: 100%;
			color: black;
			background-color: white;
			border-radius: 20px;
			width: 55vw;
			section {
				padding: 0.5vw 0.5vw;
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
	}
	.type-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		justify-content: center;
	}
	.ability-container {
		display: flex;
		flex-direction: row;
		margin-top: 1vw;
		align-items: center;
		justify-content: center;
	}
</style>
