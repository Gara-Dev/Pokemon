<script lang="ts">
	import type { Pokemon } from '$lib/types/Pokemon';
	import type { Stats } from '$lib/types/Stats';
	import type { Nature } from '$lib/types/Nature';
	import { onMount } from 'svelte';
	import StatBar from '$lib/components/StatBar.svelte';
	import IV from '$lib/components/IV.svelte';

	export let pokemon: Pokemon;

	let level: number = 50;
	const baseStatMax: number = 170;
	const EffStatMax: number = 300;
	const HpEffStat: number = 400;
	let natures: any;
	let nature: Nature;
	let stats: Stats = {};
	let IVs: Stats = {};
	let keys: Array<keyof Stats> = Object.keys(pokemon.stats) as Array<keyof Stats>;

	function generateIV() {
		for (let k of keys) {
			IVs[k] = Math.floor(Math.random() * 32);
		}
	}

	function updateLevel() {
		if (level < 1) level = 1;
		if (level > 100) level = 100;
		updateAll();
	}

	function updateHp() {
		stats.Hp =
			Math.floor(0.01 * (2 * (pokemon.stats.Hp ?? 1) + (IVs.Hp ?? 1)) * level) + level + 10;
	}

	function updateOther(k: keyof Stats) {
		stats[k] = Math.round(
			(Math.floor(0.01 * (2 * Number(pokemon.stats[k] ?? 1) + Number(IVs[k])) * level) + 5) *
				(nature.stats[k] ?? 1)
		);
	}

	function updateAll() {
		updateHp();
		for (let k of keys) {
			if (k != 'Hp') updateOther(k);
		}
	}

	function IVupdate(stat: keyof Stats, value: number | undefined) {
		IVs[stat] = value;

		if ((IVs[stat] ?? -1) > 31) IVs[stat] = 31;
		if ((IVs[stat] ?? -1) < 0) IVs[stat] = 0;

		if (stat == 'Hp') updateHp();
		else updateOther(stat);
		console.log(level);
	}

	onMount(async () => {
		const res = await fetch('/natures.json');

		if (res.ok) {
			natures = await res.json();
			nature = (await natures)[Math.floor(Math.random() * 25) + 1];
		}
		generateIV();
		updateAll();
	});

	async function regenerate() {
		nature = await natures[Math.floor(Math.random() * 25)];
		generateIV();
		updateAll();
	}
</script>

<div class="popup-content">
	<div class="img-wrapper">
		<label for="level">Livello:</label>
		<input name="level" type="number" min="1" max="100" bind:value={level} on:input={updateLevel} />

		<img alt={pokemon.name} src={pokemon.sprite} />
		<button on:click={regenerate}><img src="/img/misc/refresh.svg" alt="refresh" /></button>
	</div>
	<div>
		<section>
			{#each keys as stat}
				<article>
					<StatBar
						statName={stat}
						stat={pokemon.stats[stat]}
						max={baseStatMax}
						color={stat + 'Color'}
					/>
				</article>
			{/each}
		</section>

		<section>
			{#each keys as stat}
				{#if stat != 'Tot'}
					<article>
						<StatBar
							statName={stat}
							stat={stats[stat]}
							max={stat != 'Hp' ? EffStatMax : HpEffStat}
							color={stat + 'Color'}
						/>
						<IV {stat} {IVupdate} value={IVs[stat]} />
					</article>
				{/if}
			{/each}

			<span>
				Natura: {nature?.name}
				{#if nature != undefined && Object.keys(nature.stats)[0] != undefined}
					{`-> ${Object.keys(nature.stats)[0]}`}
					<img src="/img/misc/upgrade.svg" alt="up" />
					{`${Object.keys(nature.stats)[1]}`}
					<img src="/img/misc/downgrade.svg" alt="down" />
				{/if}
			</span>
		</section>
	</div>
</div>

<style lang="scss">
	@import url('/colors.css');

	.img-wrapper {
		text-align: center;

		img {
			width: 100%;
		}

		> button {
			height: 10%;
			width: 15%;
			background: none;
			border: none;
		}
	}

	.popup-content {
		border-radius: 30px;
		background-color: white;
		width: 70%;
		height: 70%;
		margin: 5% 15%;
		display: flex;
		flex-direction: row;

		> div {
			padding-left: 8%;
			padding-top: 5%;
			width: 40%;

			section {
				display: flex;
				flex-direction: column;
				width: 100%;
				margin: 0% 5%;
				padding-top: 3%;

				article {
					display: flex;
					flex-direction: row;
					height: 2vw;
				}

				> span {
					font-size: larger;

					> img {
						padding-top: 0.5%;
						width: 5%;
					}
				}
			}
		}
	}
</style>
