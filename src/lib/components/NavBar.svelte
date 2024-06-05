<section>
	<article>
		<a href="/generator"><img src="/img/misc/gen.svg" alt="generator" /></a>
	</article>
	<article>
		<a href="/wiki"><img src="/img/misc/wiki.svg" alt="wiki" /></a>
	</article>
</section>

<style lang="scss">
	@import '/static/colors.css';

	section {
		margin-left: 1vw;
		width: 5vw;
		padding: 1vw;
		background-color: var(--InnerCard);
		height: 20vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		border-radius: 30px;
		border: 3px solid black;
		article {
			border: 3px solid black;
			width: 5vw;
			height: 5vw;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 30px;
			img {
				width: 4vw;
				height: 4vw;
			}
		}
	}
</style>
