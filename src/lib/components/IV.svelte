<script lang="ts">
	export let stat: string;
	export let IVupdate: Function;
	export let value: number | undefined;
</script>

<input
	bind:value
	type="number"
	min="0"
	max="31"
	on:input={() => {
		IVupdate(stat, value);
	}}
/>

<style>
	input {
		width: 15%;
		font-size: larger;
	}
</style>
