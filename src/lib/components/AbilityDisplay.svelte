<script lang="ts">
	export let ability;
	export let hidden = false;
</script>

<div class="{hidden ? 'hidden' : 'normal'} ability-container">
	<a href="/wiki/{ability}">{ability}</a>
</div>

<style lang="scss">
	.ability-container {
		width: 8vw;
		height: 2vw;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 3px solid black;
	}
	a {
		color: white;
		text-decoration: none;
	}
	.hidden {
		margin-left: 1vw;
		border-radius: 0 100px 0 100px;
		background-color: var(--Spettro);
	}
	.normal {
		background-color: var(--Veleno);
		border-radius: 100px 0 100px 0;
	}
</style>
