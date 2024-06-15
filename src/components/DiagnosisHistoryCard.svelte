<script lang="ts">
import type { BloodPressure, DiagnosisHistory } from '$lib/types';
import { onMount } from 'svelte';
import arrowUpIcon from '$assets/icons/arrow-up.svg';
import arrowDownIcon from '$assets/icons/arrow-down.svg';
import heartIcon from '$assets/icons/heart-bpm.svg';
import tempIcon from '$assets/icons/temperature.svg';
import lungsIcon from '$assets/icons/respiratory-rate.svg';
import Card from './Card.svelte';
import Chart from 'chart.js/auto';
import ImageMask from './ImageMask.svelte';

type BloodPressureKey = keyof BloodPressure;

export let diagnosisHistory: DiagnosisHistory[];

let chartCanvasEl: HTMLCanvasElement;
let chart: Chart<'line', number[], string> | undefined = undefined;

const graphRanges = [
	{ label: 'Last 6 months', value: 6 },
	{ label: 'Last 9 months', value: 9 },
	{ label: 'Last year', value: 12 }
];

let graphSampleSize = graphRanges[0].value;
let prevSampleSize = graphSampleSize;

$: if (chart) updateChartData(diagnosisHistory, graphSampleSize);

function updateChartData(history: DiagnosisHistory[], sampleSize: number) {
	if (!chart || sampleSize === prevSampleSize) return;
	prevSampleSize = graphSampleSize;
	const diastolicData = getBPChartData('diastolic', history, -sampleSize);
	const systolicData = getBPChartData('systolic', history, -sampleSize);
	chart.data.datasets[0].data = systolicData;
	chart.data.datasets[1].data = diastolicData;
	chart.options.scales ??= { y: {} };
	if (chart.options.scales.y) {
		chart.options.scales.y.suggestedMin = Math.min(...diastolicData, ...systolicData);
		chart.options.scales.y.suggestedMax = Math.max(...diastolicData, ...systolicData);
	}
	chart.data.labels = getLabels(history, -sampleSize);
	chart.update();
}

function getDiagnosisData<T extends keyof DiagnosisHistory>(key: T, history: DiagnosisHistory[]) {
	return history.map((diagnosis) => diagnosis[key]);
}

function getBPChartData<T extends BloodPressureKey>(
	key: T,
	history: DiagnosisHistory[],
	from = 0,
	to = history.length
) {
	return getDataInRange(
		history.map((diagnosis) => diagnosis.blood_pressure[key]).map((bp) => bp.value),
		from,
		to
	);
}

function getDataInRange<T>(data: T[], from: number, to = data.length): T[] {
	const start = Math.max(from, -data.length);
	const end = Math.max(start, to);
	return data.slice(start, end);
}

function getLabels(history: DiagnosisHistory[], from: number, to = history.length) {
	return getDataInRange(history, from, to).map((d) => `${d.month.substring(0, 3)}, ${d.year}`);
}

function getBPIcon(levels: string) {
	const _levels = levels.toLowerCase();
	if (_levels.startsWith('high')) return arrowUpIcon;
	if (_levels.startsWith('low')) return arrowDownIcon;
	return '';
}

function getBPColor(bp: BloodPressureKey) {
	if (bp === 'systolic') return { point: '#E66FD2', line: '#C26EB4' };
	if (bp === 'diastolic') return { point: '#8C6FE6', line: '#7E6CAB' };
	return null;
}

$: lastBPValues = Object.entries(
	getDiagnosisData('blood_pressure', getDataInRange(diagnosisHistory, -graphSampleSize)).at(-1) ??
		{}
) as [BloodPressureKey, BloodPressure[BloodPressureKey]][];

$: lastRespiratoryRate = getDiagnosisData('respiratory_rate', diagnosisHistory).at(-1);
$: lastTemperature = getDiagnosisData('temperature', diagnosisHistory).at(-1);
$: lastHeartRate = getDiagnosisData('heart_rate', diagnosisHistory).at(-1);
$: healthStats = [
	{
		label: 'Respiratory Rate',
		value: lastRespiratoryRate?.value ?? '--',
		valueUnit: 'bpm',
		levels: lastRespiratoryRate?.levels ?? '--',
		color: '#E0F3FA',
		icon: lungsIcon
	},
	{
		label: 'Temperature',
		value: lastTemperature?.value ?? '--',
		valueUnit: '&deg;F',
		levels: lastTemperature?.levels ?? '--',
		color: '#FFE6E9',
		icon: tempIcon
	},
	{
		label: 'Heart Rate',
		value: lastHeartRate?.value ?? '--',
		valueUnit: 'bpm',
		levels: lastHeartRate?.levels ?? '--',
		color: '#FFE6F1',
		icon: heartIcon
	}
];

onMount(() => {
	const bpSystolicData = getBPChartData('systolic', diagnosisHistory, -graphSampleSize);
	const bpDiastolicData = getBPChartData('diastolic', diagnosisHistory, -graphSampleSize);
	const bpSystolicColors = getBPColor('systolic');
	const bpDiastolicColors = getBPColor('diastolic');

	const lineData = {
		labels: getLabels(diagnosisHistory, -graphSampleSize),
		datasets: [
			{
				label: 'Systolic',
				data: bpSystolicData,
				borderColor: bpSystolicColors?.line ?? '',
				pointBackgroundColor: bpSystolicColors?.point ?? '',
				pointBorderColor: '#fff',
				pointRadius: 6.5,
				tension: 0.4
			},
			{
				label: 'Diastolic',
				data: bpDiastolicData,
				borderColor: bpDiastolicColors?.line ?? '',
				pointBackgroundColor: bpDiastolicColors?.point ?? '',
				pointBorderColor: '#fff',
				pointRadius: 6.5,
				tension: 0.4
			}
		]
	} satisfies NonNullable<typeof chart>['data'];

	chart = new Chart(chartCanvasEl, {
		type: 'line',
		data: lineData,
		options: {
			responsive: true,
			interaction: {
				intersect: false
			},
			plugins: {
				legend: {
					display: false
				}
			},
			scales: {
				x: {
					grid: {
						display: false
					}
				},
				y: {
					suggestedMin: Math.min(...bpSystolicData, ...bpDiastolicData),
					suggestedMax: Math.max(...bpSystolicData, ...bpDiastolicData)
				}
			}
		}
	});

	return () => {
		chart?.destroy();
	};
});
</script>

<Card title="Diagnosis History">
	<div class="content">
		<div class="display-area">
			<div class="panel-left">
				<div class="title-bar">
					<h4>Blood Pressure</h4>
					<div class="graph-range-ctrl-wrapper">
						<select class="graph-range-ctrl" bind:value={graphSampleSize}>
							{#each graphRanges as range}
								<option value={range.value}>{range.label}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="chart-wrapper">
					<canvas bind:this={chartCanvasEl} class="chart">
						Your browser does not support the canvas element.
					</canvas>
				</div>
			</div>

			<div class="panel-right">
				{#each lastBPValues as [label, bp]}
					{@const icon = getBPIcon(bp.levels)}
					{@const colors = getBPColor(label)}
					<div class="chart-summary">
						<div class="chart-summary__title">
							<span class="chart-line-color" style:--chart-point-color={colors?.point ?? ''} />
							<h5>{label}</h5>
						</div>

						<p class="chart-summary__value">{bp.value}</p>

						<div class="chart-summary__conclusion">
							{#if icon}
								<span><img class="icon" src={icon} alt="" /></span>
							{/if}
							<p>{bp.levels}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="health-stats">
			{#each healthStats as stat}
				{@const arrowIcon = getBPIcon(stat.levels)}
				<div class="health-stat" style:--stat-card-color={stat.color}>
					<div class="health-stat__image">
						<ImageMask src={stat.icon} />
					</div>

					<span class="health-stat__label">{stat.label}</span>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<span class="health-stat__value">{stat.value} {@html stat.valueUnit}</span>

					<div class="health-stat__reading">
						{#if arrowIcon}
							<img class="icon" src={arrowIcon} alt="" />
						{/if}
						<span>{stat.levels}</span>
					</div>
				</div>
			{/each}
		</div>
	</div>
</Card>

<style lang="scss">
.content {
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 1.25rem;
}

.icon {
	width: 0.85em;
	height: 0.85em;
	object-fit: contain;
}

.display-area {
	display: grid;
	grid-template-columns: 2fr 1fr;
	gap: 2.25rem;
	width: 100%;
	min-height: 340px;
	background: var(--color-lilac);
	border-radius: var(--card-border-radius);
	padding: var(--card-p);
}

.panel-left {
	display: flex;
	flex-direction: column;
	gap: 1.75rem;
}

.title-bar {
	display: flex;
	justify-content: space-between;
	align-items: baseline;

	h4 {
		font-weight: bold;
		font-size: 1.125rem;
	}
}

.chart-wrapper {
	flex-grow: 1;
}

.chart {
	width: 100%;
	height: 100%;
}

.graph-range-ctrl-wrapper {
	position: relative;
	&::after {
		content: '';
		position: absolute;
		right: 0;
		top: 50%;
		translate: 0 -50%;
		width: 0.8em;
		aspect-ratio: 1;
		background-image: url('/src/assets/icons/arrow-down_outline.svg');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}
}

.graph-range-ctrl {
	appearance: none;
	padding: 0.5rem 1.5rem 0.5rem 1rem;
	border: none;
	background: none;
	font-size: 0.875rem;
	font-family: var(--font-sans);

	&:focus-visible {
		outline: 1px solid var(--color-purple);
	}
}

.panel-right {
	display: flex;
	flex-direction: column;
}

.chart-summary {
	display: flex;
	flex-direction: column;
	gap: 0.7rem;
	padding-bottom: 1rem;

	&:not(:first-child) {
		padding-top: 1rem;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-divider-dark);
	}
}

.chart-summary__title {
	display: flex;
	gap: 4px;
	align-items: center;
	font-size: 0.875rem;

	h5 {
		text-transform: capitalize;
		font-weight: bold;
	}
}

.chart-line-color {
	display: block;
	width: 1em;
	aspect-ratio: 1;
	border-radius: 999px;
	border: 1px solid var(--color-white);
	background: var(--chart-point-color);
}

.chart-summary__value {
	font-size: 1.375rem;
	font-weight: bold;
}

.chart-summary__conclusion {
	display: flex;
	gap: 0.5rem;
	align-items: center;
	font-size: 0.875rem;
}

.health-stats {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-template-rows: 100%;
	gap: 1.3125rem;
}

.health-stat {
	display: flex;
	flex-direction: column;
	gap: 1.2rem;
	padding: 1rem;
	border-radius: var(--card-border-radius);
	background: var(--stat-card-color);
}

.health-stat__image {
	width: max(40%, 80px);
	aspect-ratio: 1;
}

.health-stat__label {
	font-size: 1rem;
}

.health-stat__value {
	font-weight: bold;
	font-size: 1.875rem;
	line-height: 1.1;
	margin-top: -1rem;
	white-space: pre;
}

.health-stat__reading {
	display: flex;
	align-items: center;
	gap: 0.5rem;
}
</style>
