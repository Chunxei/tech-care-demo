<script lang="ts">
export let title = '';
export let icon = '';
export let fillContainer = false;
</script>

<div class="Card" class:fillContainer>
	{#if title || icon}
		<div class="header">
			{#if title}
				<h3>{title}</h3>
			{/if}
			{#if icon}
				<img src={icon} alt="" />
			{/if}
		</div>
	{/if}

	<slot />
</div>

<style lang="scss">
.Card {
	display: flex;
	flex-direction: column;
	width: 100%;
	border-radius: var(--card-border-radius);
	padding: var(--card-p);
	background: var(--color-white);
	box-shadow: var(--card-shadow);

	&.fillContainer {
		height: 100%;
	}
}

.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.875rem;
	font-size: 1.5rem;

	h3 {
		font-weight: bold;
		line-height: 1.375;
	}

	img {
		width: 0.85em;
		height: 0.85em;
	}
}
</style>
