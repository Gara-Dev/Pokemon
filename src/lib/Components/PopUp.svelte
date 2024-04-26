<script lang="ts">
	import type { Pokemon } from '$lib/types/Pokemon';
	import type { Stats } from '$lib/types/Stats';
	import type { Nature } from '$lib/types/Nature';
	import { onMount } from 'svelte';
	import StatBar from '$lib/Components/StatBar.svelte';
	import IV from './IV.svelte';

	export let pokemon: Pokemon;

	let level = 50;
	const baseStatMax = 200;
	const EffStatMax = 300;
	let natures: any;
	let nature: Nature;
	let stats: Stats = {};
	let IVs: Stats = {};

	function generateIV() {
		for (let k of Object.keys(pokemon.stats) as Array<keyof Stats>) {
			IVs[k] = Math.floor(Math.random() * 32);
		}
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

	function getStats() {
		updateHp();
		for (let k of Object.keys(pokemon.stats) as Array<keyof Stats>) {
			if (k != 'Hp') updateOther(k);
		}
	}

	function IVupdate(stat: keyof Stats, value: number | undefined) {
		IVs[stat] = value;

		if ((IVs[stat] ?? -1) > 31) IVs[stat] = 31;
		if ((IVs[stat] ?? -1) < 0) IVs[stat] = 0;

		if (stat == 'Hp') updateHp();
		else updateOther(stat);
	}

	onMount(async () => {
		const res = await fetch('/natures.json');

		if (res.ok) {
			natures = await res.json();
			nature = (await natures)[Math.floor(Math.random() * 25) + 1];
		}
		generateIV();
		getStats();
	});

	async function regenerate() {
		nature = await natures[Math.floor(Math.random() * 25)];
		generateIV();
		getStats();
	}
</script>

<div class="popup-content">
	<div class="img-wrapper">
		<img alt={pokemon.name} src={pokemon.sprite} />
		<button on:click={regenerate}><img src="/img/misc/refresh.svg" alt="refresh" /></button>
	</div>
	<div>
		<section>
			<article>
				<StatBar statName={'Hp'} stat={pokemon.stats.Hp} max={baseStatMax} color={'HpColor'} />
			</article>

			<article>
				<StatBar statName={'Atk'} stat={pokemon.stats.Atk} max={baseStatMax} color={'AtkColor'} />
			</article>

			<article>
				<StatBar statName={'Def'} stat={pokemon.stats.Def} max={baseStatMax} color={'DefColor'} />
			</article>

			<article>
				<StatBar
					statName={'SpAtk'}
					stat={pokemon.stats.SpAtk}
					max={baseStatMax}
					color={'SpAtkColor'}
				/>
			</article>

			<article>
				<StatBar
					statName={'SpDef'}
					stat={pokemon.stats.SpDef}
					max={baseStatMax}
					color={'SpDefColor'}
				/>
			</article>

			<article>
				<StatBar statName={'Spd'} stat={pokemon.stats.Spd} max={baseStatMax} color={'SpdColor'} />
			</article>
		</section>

		<section>
			<article>
				<StatBar statName={'Hp'} stat={stats.Hp} max={EffStatMax} color={'HpColor'} />
				<IV stat={'Hp'} {IVupdate} value={IVs.Hp} />
			</article>
			<article>
				<StatBar statName={'Atk'} stat={stats.Atk} max={EffStatMax} color={'AtkColor'} />
				<IV stat={'Atk'} {IVupdate} value={IVs.Atk} />
			</article>
			<article>
				<StatBar statName={'Def'} stat={stats.Def} max={EffStatMax} color={'DefColor'} />
				<IV stat={'Def'} {IVupdate} value={IVs.Def} />
			</article>
			<article>
				<StatBar statName={'SpAtk'} stat={stats.SpAtk} max={EffStatMax} color={'SpAtkColor'} />
				<IV stat={'SpAtk'} {IVupdate} value={IVs.SpAtk} />
			</article>
			<article>
				<StatBar statName={'SpDef'} stat={stats.SpDef} max={EffStatMax} color={'SpDefColor'} />
				<IV stat={'SpDef'} {IVupdate} value={IVs.SpDef} />
			</article>
			<article>
				<StatBar statName={'Spd'} stat={stats.Spd} max={EffStatMax} color={'SpdColor'} />
				<IV stat={'Spd'} {IVupdate} value={IVs.Spd} />
			</article>
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
	:root {
		--HpColor: #65ea2282;
		--AtkColor: #ecd0439f;
		--DefColor: #e97d2f86;
		--SpAtkColor: #32bee17c;
		--SpDefColor: #5170d778;
		--SpdColor: #ef8dec77;
	}

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
