<script lang="ts">
	import type { Pokemon } from '$lib/types/Pokemon';
	import type { Stats } from '$lib/types/Stats';
	import type { Nature } from '$lib/types/Nature';
	import { onMount } from 'svelte';

	export let pokemon: Pokemon;

	let level = 50;
	let nature: Nature;
	let stats: Stats = {};
	let IVs: Stats = {};

	function generateIV() {
		for (let k of Object.keys(pokemon.stats) as Array<keyof Stats>) {
			IVs[k] = Math.floor(Math.random() * 32);
		}
	}

  function updateHp() {
		stats.Hp = Math.floor(0.01 * (((2 * (pokemon.stats.Hp ?? 1)) + (IVs.Hp ?? 1))) * level) + level + 10;
  }

  function updateOther(k: keyof Stats) {
    stats[k] =
					Math.round((Math.floor(0.01 * (2 * Number(pokemon.stats[k] ?? 1) + Number(IVs[k])) * level) + 5) *
					(nature.stats[k] ?? 1));
  }

	function getStats() {
    updateHp();

		for (let k of Object.keys(pokemon.stats) as Array<keyof Stats>) {
			if (k != 'Hp')
        updateOther(k);
		}
	}

  function IVupdate(stat: keyof Stats) {
    if(!IVs[stat]) return

    if((IVs[stat] ?? -1) > 31)
      IVs[stat] = 31;

    if(((IVs[stat] ?? -1) < 0))
      IVs[stat] = 0;

    if(stat == 'Hp')
      updateHp();
    else
      updateOther(stat);
  }

	onMount(async () => {
		const res = await fetch('/natures.json');

		if (res.ok) {
      let body = res.json();
			nature = (await body)[Math.floor(Math.random() * 25) + 1];
		}
    generateIV();
		getStats();
	});

</script>

<div class="popup-content">
	<article>
		<span id="HpV">Hp {stats.Hp}</span>
		<input bind:value={IVs.Hp} type="number" name="Hp" id="HpIV" min="0" max="31" on:keyup={() => {IVupdate('Hp')}}/>
	</article>

	<article>
		<span id="AtkV">Atk {stats.Atk}</span>
		<input bind:value={IVs.Atk} type="number" name="Atk" id="AtkIV" min="0" max="31" on:keyup={() => {IVupdate('Atk')}}/>
	</article>

	<article>
		<span id="DefV">Def {stats.Def}</span>
		<input bind:value={IVs.Def} type="number" name="Def" id="DefIV" min="0" max="31" on:keyup={() => {IVupdate('Def')}}/>
	</article>

	<article>
		<span id="SpAtkV">SpAtk {stats.SpAtk}</span>
		<input bind:value={IVs.SpAtk} type="number" name="SpAtk" id="SpAtkIV" min="0" max="31" on:keyup={() => {IVupdate('SpAtk')}}/>
	</article>

	<article>
		<span id="SpdefV">SpDef {stats.SpDef}</span>
		<input bind:value={IVs.SpDef} type="number" name="SpDef" id="SpDefIV" min="0" max="31" on:keyup={() => {IVupdate('SpDef')}}/>
	</article>

	<article>
		<span id="SpdV">Spd {stats.Spd}</span>
		<input bind:value={IVs.Spd} type="number" name="Spd" id="SpdIV" min="0" max="31" on:keyup={() => {IVupdate('Spd')}}/>
	</article>
    <span>{nature?.name}</span>
</div>

<style>
	.popup-content {
		background-color: white;
		width: 70%;
		height: 70%;
		margin: 5% 15%;
	}
</style>
