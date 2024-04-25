<script lang="ts">
	export let statName: string;
	export let stat: number | undefined;
	export let max: number;
	export let color: string;
</script>

<span>
	{statName}
	{stat}
	<div style=" background-color: var(--{color}); width: {((stat ?? 1) / max) * 100}%;"></div>
</span>

<style lang="scss">
	span {
		padding-top: 1.2%;
		display: block;
		min-width: 85%;
		border: 2px solid black;
		font-size: larger;
		position: relative;

		> div {
			position: absolute;
			height: 100%;
			top: 0;
			border-top-right-radius: 2vw;
			border-bottom-right-radius: 2vw;
		}
	}
</style>
