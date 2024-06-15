<script lang="ts" context="module">
export type ActionTableEntry =
	| {
			label: string;
			value: string;
	  }
	| {
			id: string;
			label: string;
			icon: string;
			actionType: string;
	  };
</script>

<script lang="ts">
import { createEventDispatcher } from 'svelte';
import Card from './Card.svelte';

const dispatch = createEventDispatcher<{ action: { action: string; id: string } }>();

export let rows: ActionTableEntry[][];
export let title = '';
export let hideHeadings = false;
export let bordered = false;
export let fillContainer = false;

$: headings = [...new Set(rows[0].map(({ label }) => label))];

function handleAction(actionEntry: Extract<ActionTableEntry, { actionType: string }>) {
	dispatch('action', { action: actionEntry.actionType, id: actionEntry.id });
}
</script>

<Card {title} {fillContainer}>
	<div class="card-body">
		<div class="table-wrapper" class:shrink-top={hideHeadings} class:bordered>
			<table>
				{#if !hideHeadings}
					<thead>
						<tr>
							{#each headings as heading (heading)}
								<th>
									<div>
										{heading}
									</div>
								</th>
							{/each}
						</tr>
					</thead>
				{/if}

				<tbody>
					{#each rows as row}
						<tr>
							{#each row as col (col.label)}
								{@const actionEntry = 'actionType' in col ? col : null}
								{@const textEntry = !('actionType' in col) ? col : null}
								<td>
									<div>
										{#if actionEntry}
											<button type="button" on:click={() => handleAction(actionEntry)}>
												<img src={actionEntry.icon} alt="" />
											</button>
										{:else if textEntry}
											<span>{textEntry.value}</span>
										{/if}
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</Card>

<style lang="scss">
.card-body {
	position: relative;
	width: 100%;
	flex-grow: 1;
}
.table-wrapper {
	position: absolute;
	overflow-y: auto;
	height: 100%;
	width: 100%;
	padding-right: 4px;

	&.shrink-top {
		margin-top: -0.75rem;
	}
}

table {
	width: 100%;
	border-collapse: collapse;
}

thead {
	position: sticky;
	top: 0;
}

:where(th, td) {
	text-align: start;

	div {
		display: flex;
		align-items: center;
		min-height: 50px;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}

	&:first-child {
		div {
			padding-left: 1rem;
		}
	}

	&:last-child {
		div {
			padding-right: 1rem;
		}
	}
}

th {
	font-weight: bold;

	div {
		background-color: var(--color-bg-muted);
		padding-top: 0.875rem;
		padding-bottom: 0.875rem;
		margin-bottom: 1rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	&:first-child {
		div {
			border-top-left-radius: 25px;
			border-bottom-left-radius: 25px;
		}
	}

	&:last-child {
		div {
			border-top-right-radius: 25px;
			border-bottom-right-radius: 25px;
		}
	}
}

td {
	div {
		padding-top: 0.875rem;
		padding-bottom: 0.875rem;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		background: none;
		border: none;
		cursor: pointer;
	}
}

tr {
	text-align: start;
}

tbody tr {
	.bordered & {
		border-bottom: 1px solid var(--color-divider);
	}

	&:hover {
		background-color: var(--color-bg-muted);
	}
}
</style>
