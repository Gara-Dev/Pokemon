<script lang="ts">
	import TypeDisplay from '$lib/components/TypeDisplay.svelte';
	export let arr: string[];
	export let message: string;
</script>

<tr class="container">
	<td>
		<table>
			<tbody>
				<tr class="innerRow">
					<th><p>{message}</p></th>
					<td class="types">
						{#if arr.length > 0}
							{#each arr as type}
								<div>
									<TypeDisplay {type} />
								</div>
							{/each}
						{:else}
							<div>
								<TypeDisplay type={'Nessuno'} />
							</div>
						{/if}
					</td>
				</tr>
			</tbody>
		</table>
	</td>
</tr>

<style lang="scss">
	@import '/static/colors.css';
	td {
		border-radius: 20px;
	}
	.container {
		background-color: var(--InnerCard);
		p {
			width: 4vw;
			min-width: 4vw;
			padding-right: 2vw;
		}
		.types {
			vertical-align: middle;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			align-items: center;
		}
		.innerRow {
			display: flex;
			align-items: center;
		}
	}
</style>
