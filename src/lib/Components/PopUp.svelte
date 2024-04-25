<script lang="ts">
	import type { Pokemon } from '$lib/types/Pokemon';
	import type { Stats } from '$lib/types/Stats';
	import type { Nature } from '$lib/types/Nature';
	import { onMount } from 'svelte';
	import StatBar from '$lib/Components/StatBar.svelte';

	export let pokemon: Pokemon;

	let level = 50;
  let baseStatMax = 200;
  let EffStatMax = 300;
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

	function IVupdate(stat: keyof Stats) {
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
				<StatBar statName={'SpAtk'} stat={pokemon.stats.SpAtk} max={baseStatMax} color={'SpAtkColor'} />
			</article>

			<article>
				<StatBar statName={'SpDef'} stat={pokemon.stats.SpDef} max={baseStatMax} color={'SpDefColor'} />
			</article>

			<article>
				<StatBar statName={'Spd'} stat={pokemon.stats.Spd} max={baseStatMax} color={'SpdColor'} />
			</article>
		</section>

		<section>
			<article>

				<StatBar statName={'Hp'} stat={stats.Hp} max={300} color={'HpColor'} />
				<input
					bind:value={IVs.Hp}
					type="number"
					name="Hp"
					id="HpIV"
					min="0"
					max="31"
					on:input={() => {
						IVupdate('Hp');
					}}
				/>
			</article>
			<article>

				<StatBar statName={'Atk'} stat={stats.Atk} max={300} color={'AtkColor'} />

				<input
					bind:value={IVs.Atk}
					type="number"
					name="Atk"
					id="AtkIV"
					min="0"
					max="31"
					on:input={() => {
						IVupdate('Atk');
					}}
				/>
			</article>
			<article>

				<StatBar statName={'Def'} stat={stats.Def} max={300} color={'DefColor'} />

				<input
					bind:value={IVs.Def}
					type="number"
					name="Def"
					id="DefIV"
					min="0"
					max="31"
					on:input={() => {
						IVupdate('Def');
					}}
				/>
			</article>
			<article>

				<StatBar statName={'SpAtk'} stat={stats.SpAtk} max={300} color={'SpAtkColor'} />

				<input
					bind:value={IVs.SpAtk}
					type="number"
					name="SpAtk"
					id="SpAtkIV"
					min="0"
					max="31"
					on:input={() => {
						IVupdate('SpAtk');
					}}
				/>
			</article>
			<article>

				<StatBar statName={'SpDef'} stat={stats.SpDef} max={300} color={'SpDefColor'} />

				<input
					bind:value={IVs.SpDef}
					type="number"
					name="SpDef"
					id="SpDefIV"
					min="0"
					max="31"
					on:input={() => {
						IVupdate('SpDef');
					}}
				/>
			</article>
			<article>
				<StatBar statName={'Spd'} stat={stats.Spd} max={300} color={'SpdColor'} />

				<input
					bind:value={IVs.Spd}
					type="number"
					name="Spd"
					id="SpdIV"
					min="0"
					max="31"
					on:input={() => {
						IVupdate('Spd');
					}}
				/>
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

					input {
						width: 15%;
						font-size: larger;
					}
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
