<script lang="ts">
import searchIcon from '$assets/icons/search.svg';
import { getPatientsInfo } from '$lib/context';
import type { Patient } from '$lib/types';
import Card from './Card.svelte';
import PatientListItem from './PatientListItem.svelte';

const { patients, setCurrentPatient, currentPatient } = getPatientsInfo();

function handlePatientClick(patient: Patient) {
	setCurrentPatient(patient);
}
</script>

<aside class="PatientsListAside">
	<Card title="Patients" icon={searchIcon} fillContainer>
		<div class="list-wrapper">
			<div class="list">
				{#each $patients as patient (patient.name)}
					<PatientListItem
						{patient}
						active={patient.name === $currentPatient?.name}
						on:click={() => handlePatientClick(patient)}
					/>
				{/each}
			</div>
		</div>
	</Card>
</aside>

<style lang="scss">
.list-wrapper {
	position: relative;
	flex-grow: 1;
	min-height: var(--screen-vh);
}

.list {
	position: absolute;
	inset: 0;
	--patients-list-mx: calc(0px - var(--card-p));
	overflow-y: auto;
	margin-left: var(--patients-list-mx);
	margin-right: calc(var(--patients-list-mx) + 4px);
}
</style>
