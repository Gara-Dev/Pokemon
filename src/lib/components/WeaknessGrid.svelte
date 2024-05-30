<script lang="ts">
	import type { Pokemon } from '$lib/types/Pokemon';
	import type { Type } from '$lib/types/Type';
	import type { Types } from '$lib/types/Types';
	import WeaknessComponent from '$lib/components/WeaknessComponent.svelte';
	export let pokemon: Pokemon;

	let types = {
		Normale: 1,
		Fuoco: 1,
		Lotta: 1,
		Acqua: 1,
		Volante: 1,
		Erba: 1,
		Veleno: 1,
		Elettro: 1,
		Terra: 1,
		Psico: 1,
		Roccia: 1,
		Ghiaccio: 1,
		Coleottero: 1,
		Drago: 1,
		Spettro: 1,
		Buio: 1,
		Acciaio: 1,
		Folletto: 1
	};

	let imm: Array<string> = [];
	let res: Array<string> = [];
	let dRes: Array<string> = [];
	let std: Array<string> = [];
	let weak: Array<string> = [];
	let dWeak: Array<string> = [];

	function findTypesWeakness() {
		Object.keys(pokemon.type).forEach((typeKey) => {
			const currentType = pokemon.type[typeKey as keyof Types];
			if (currentType)
				Object.keys(currentType).forEach((eff: string) => {
					currentType[eff as keyof Type].forEach((stat) => {
						const k: keyof typeof types = stat as keyof typeof types;
						types[k] = types[k] * (eff == 'weakness' ? 2 : eff == 'resistance' ? 0.5 : 0);
					});
				});
		});
	}

	function assignTypesWeaknesses() {
		Object.keys(types).forEach((type) => {
			const k = type as keyof typeof types;
			if (types[k] > 1)
				if (types[k] == 2) weak.push(type);
				else dWeak.push(type);
			else if (types[k] < 1)
				if (types[k] == 0.5) res.push(type);
				else dRes.push(type);
			else std.push(type);
		});
	}
	findTypesWeakness();
	assignTypesWeaknesses();
</script>

<table>
	<tbody>
		<tr>
			<td>
				<span>Sotto conzionio normali il pokemon è:</span>
			</td>
		</tr>
		<WeaknessComponent arr={imm} message={'Immune a:'} />
		<WeaknessComponent arr={dRes} message={'Doppiamente Resistente a:'} />
		<WeaknessComponent arr={res} message={'Resistente a:'} />
		<WeaknessComponent arr={std} message={'Danneggiato normalmente da:'} />
		<WeaknessComponent arr={weak} message={'debole a:'} />
		<WeaknessComponent arr={dWeak} message={'Doppiamente debole a:'} />
	</tbody>
</table>

<style lang="scss">
	@import '/static/colors.css';
	table {
		span {
			margin-left: 2vw;
			font-weight: bolder;
		}
		margin-top: 1vw;
		background-color: var(--OuterCard);
		border: 3px solid black;
		border-radius: 20px;
	}
</style>
