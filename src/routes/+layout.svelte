<script>
	import Header from '../components/Header.svelte';
</script>

<svelte:head>
	<title>Tech.Care</title>
</svelte:head>

<div class="Layout">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	@import '$assets/fonts/__fonts.scss';
	:root {
		/* typo */
		--font-sans: Manrope, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
			Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

		/* colors */
		--color-primary: #01f0d0;
		--color-active-state-2: #d8fcf7;
		--color-bg-muted: #f6f7f8;
		--color-divider: #ededed;
		--color-divider-dark: #cbc8d4;
		--color-text-gray: #707070;
		--color-scrollbar-gray: #e3e4e6;
		--color-black: #000;
		--color-dark: #072635;
		--color-white: #fff;
		--color-lilac: #f4f0fe;
		--color-pink: #e66fd2;
		--color-pink-desat: #c26eb4;
		--color-purple: #8c6fe6;
		--color-purple-desat: #7e6cab;

		/* dimensions */
		--header-height: 4.5rem;
		--layout-header-gap: 2rem;
		--layout-px: 1.125rem;
		--layout-py: 1.4375rem;
		--layout-max-w: 110rem;
		--card-p: 1.25rem;
		--svh: 1vh;
		@supports (height: 100svh) {
			--svh: 1svh;
		}
		--screen-vh: calc(var(--svh) * 100);
		--hero-height: calc(
			var(--screen-vh) - var(--header-height) - var(--layout-header-gap) - var(--layout-py) * 2
		);

		/* misc */
		--card-border-radius: 1rem;
		--card-shadow: 0 4px 4px -1px rgb(0 0 0 / 5%);

		::-webkit-scrollbar {
			width: 6px;
		}
		::-webkit-scrollbar-track {
			background: var(--color-scrollbar-gray);
		}
		::-webkit-scrollbar-thumb {
			background: var(--color-dark);
		}
	}

	.Layout {
		display: flex;
		font-family: var(--font-sans);
		font-size: 0.875rem;
		line-height: 1.3;
		flex-direction: column;
		min-height: var(--screen-vh);
		gap: var(--layout-header-gap);
		background: var(--color-bg-muted);
		padding: var(--layout-py) var(--layout-px);
	}

	main {
		min-height: var(--hero-height);
		width: 100%;
		max-width: var(--layout-max-w);
		margin: 0 auto;
	}
</style>
