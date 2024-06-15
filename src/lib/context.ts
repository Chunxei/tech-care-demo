import { getContext, setContext } from "svelte";
import { derived, readable, writable } from "svelte/store";
import type { DiagnosisHistory, Patient } from "./types";
import { orderMonths } from "./date";

function newContext<
  TContext,
  TCreateArgs extends unknown[],
>(
  create: (...args: TCreateArgs) => TContext,
) {
  const ctxKey = Symbol()
  function set(...args: TCreateArgs) {
    const ctx = create(...args)
    setContext(ctxKey, ctx)
    return ctx
  }
  function get() {
    return getContext<TContext>(ctxKey)
  }
  return [set, get] as const
}

const [setPatients, getPatientsInfo] = newContext((
  patientsList: Patient[],
) => {
  const patients = readable(patientsList)
  const currentPatientId = writable('')
  const sep = '-*-*-*-'

  // Used since the patient object has no ID field
  function setCurrentPatient(patient: Patient) {
    currentPatientId.set(`${patient.name}${sep}${patient.phone_number}${sep}${patient.insurance_type}`)
  }

  const currentPatient = derived([patients, currentPatientId], ([$patients, $id]) =>{
    if (!$id) return null
    const [name, phone_number, insurance_type] = $id.split(sep)
    return $patients.find((p) => p.name === name && p.phone_number === phone_number && p.insurance_type === insurance_type) ?? null
  })

  const currentPatientDiagnosisHistory = derived(currentPatient, ($patient) => {
    const diagnoses = $patient?.diagnosis_history ?? []
    return diagnoses.toSorted((a, b) => {
      if (a.year !== b.year) return Number(a.year) - Number(b.year)
      return orderMonths(a.month, b.month)
    })
  })

  return {
    patients,
    setCurrentPatient,
    currentPatient,
    currentPatientDiagnosisHistory,
  }
})

export {setPatients, getPatientsInfo}