<script lang="ts">
	export let type;
</script>

<div style="background-color: var(--{type});" class="type">{type}</div>

<style lang="scss">
	@import url('/colors.css');

	div {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		width: 8vw;
		height: 2vw;
		border: 3px solid black;
		color: white;
	}
</style>
