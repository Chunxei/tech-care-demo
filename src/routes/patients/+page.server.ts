import {PATIENTS_LIST_URL, DEV_USER, DEV_PASS} from '$env/static/private'
import { fetchJson } from '$lib/fetch'
import type { Patient } from '$lib/types'

export async function load({fetch}) {
  const patientsList = await fetchJson<Patient[]>(fetch, PATIENTS_LIST_URL, {
    headers: {
      Authorization: `Basic ${btoa(`${DEV_USER}:${DEV_PASS}`)}`
    },
  }) ?? []

  return {
    patientsList
  }
}

