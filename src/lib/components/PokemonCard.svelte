<script lang="ts">
	import type { Pokemon } from '$lib/types/Pokemon.d.ts';
	export let pokemon: Pokemon;
	let hidden = true;
	function show() {
		hidden = false;
	}
	function hide() {
		hidden = true;
	}
</script>

<div class="card">
	<div class="img-container">
		<img
			src={pokemon.sprite}
			alt={pokemon.name}
			on:mouseleave={hide}
			on:mouseover={show}
			on:focus={show}
		/>
		<p on:mouseleave={hide} on:mouseover={show} on:focus={show}>
			{pokemon.description}
		</p>
	</div>
	<div class="link">
		<a href="/wiki/{pokemon.name}">{pokemon.name}</a>
	</div>
</div>

<style lang="scss">
	@import '/static/colors.css';
	.card {
		margin: 0.25vw;
		background-color: var(--OuterCard);
		border-radius: 20px;
		.img-container {
			margin: 0.5vw 0.5vw 0 0.5vw;
			position: relative;
			img {
				border: 3px solid black;
				background-color: white;
				width: 10vw;
				height: 10vw;
				border-radius: 20px;
				transition: filter 0.3s;
			}
			p {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				background: rgba(0, 0, 0, 0.6);
				color: white;
				padding: 1vw;
				border-radius: 10px;
				text-align: center;
				opacity: 0;
				transition: opacity 0.3s;
			}

			&:hover img {
				filter: blur(5px);
			}

			&:hover p {
				opacity: 1;
			}
		}
		.link {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0.4vw;
			a {
				text-decoration: none;
				color: black;
				border: 2px solid black;
				border-radius: 20px;
				height: 3vh;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 50%;
				background-color: var(--InnerCard);
			}
		}
	}
	.hidden {
		display: none;
	}
</style>
