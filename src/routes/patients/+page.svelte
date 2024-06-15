<script lang="ts">
import Table, { type ActionTableEntry } from '$components/Table.svelte';
import DiagnosisHistoryCard from '$components/DiagnosisHistoryCard.svelte';
import PatientsListAside from '$components/PatientsListAside.svelte';
import PersonalInfoCard from '$components/PersonalInfoCard.svelte';
import downloadIcon from '$assets/icons/download.svg';
import { setPatients } from '$lib/context';
import { onMount } from 'svelte';

export let data;
const { patients, setCurrentPatient, currentPatient, currentPatientDiagnosisHistory } = setPatients(
	data.patientsList
);

$: loading = !$currentPatient;

$: diagnoses =
	$currentPatient?.diagnostic_list.map((diagnosis): ActionTableEntry[] => [
		{ label: 'Problem/Diagnosis', value: diagnosis.name },
		{ label: 'Description', value: diagnosis.description },
		{ label: 'Status', value: diagnosis.status }
	]) ?? [];

$: labResults =
	$currentPatient?.lab_results.map((result): ActionTableEntry[] => [
		{
			label: 'Test',
			value: result
		},
		{
			id: result,
			label: 'Download',
			icon: downloadIcon,
			actionType: 'download'
		}
	]) ?? [];

onMount(() => {
	const mockPatientName = 'Jessica Taylor';
	const mockPatient = $patients?.find((patient) => patient.name === mockPatientName);
	if (mockPatient) {
		setCurrentPatient(mockPatient);
	} else if ($patients?.length) {
		setCurrentPatient($patients[0]);
	}
});
</script>

<article class="PatientsPage" class:loading>
	{#if loading}
		<p>Loading...</p>
	{:else}
		<PatientsListAside />

		<div class="panel-center">
			{#if $currentPatient}
				<DiagnosisHistoryCard diagnosisHistory={$currentPatientDiagnosisHistory} />
			{/if}

			<Table title="Diagnostic List" rows={diagnoses} bordered fillContainer />
		</div>

		<div class="panel-right">
			{#if $currentPatient}
				<PersonalInfoCard patient={$currentPatient} />
			{/if}

			<Table title="Lab Results" rows={labResults} hideHeadings fillContainer />
		</div>
	{/if}
</article>

<style lang="scss">
.PatientsPage {
	display: grid;
	grid-template-columns: 1fr 2fr 1fr;
	grid-template-rows: max-content;
	grid-auto-rows: 1fr;
	width: 100%;
	gap: 2.0625rem;

	&.loading {
		grid-template-columns: 100%;
		place-content: center;
		place-items: center;
		min-height: var(--hero-height);
	}
}

:where(.panel-center, .panel-right) {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	width: 100%;
}
</style>
