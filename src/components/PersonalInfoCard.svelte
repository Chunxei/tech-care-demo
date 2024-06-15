<script lang="ts">
import calendarIcon from '$assets/icons/calendar_birth.svg';
import femaleIcon from '$assets/icons/female.svg'
import maleIcon from '$assets/icons/male.svg'
import phoneIcon from '$assets/icons/phone.svg'
import shieldIcon from '$assets/icons/shield.svg'
import UserDetailListItem from './UserDetailListItem.svelte';
import type { Patient } from '$lib/types';
import Card from "./Card.svelte";
import ImageMask from './ImageMask.svelte';
import { fmtDate } from '$lib/date';
import Button from './Button.svelte';

export let patient: Patient

$: userDetailList = [
  { label: 'Date Of Birth', value: patient.date_of_birth, icon: calendarIcon },
  { label: 'Gender', value: patient.gender, icon: '' },
  { label: 'Contact Info.', value: patient.phone_number, icon: phoneIcon },
  { label: 'Emergency Contacts', value: patient.emergency_contact, icon: phoneIcon },
  { label: 'Insurance Provider', value: patient.insurance_type, icon: shieldIcon },
]
type Detail = typeof userDetailList[number]

function fmtDetail(detail: Detail) {
  let {icon, value, label} = detail
  if (label.toLowerCase() === 'gender') {
    switch (value.toLowerCase()) {
      case 'male':
        icon = maleIcon
        break
      case 'female':
        icon = femaleIcon
        break
      default:
        icon = shieldIcon
        break
    }
  }

  if (label.toLowerCase() === 'date of birth') {
    value = fmtDate(value)
  }

  return {label, value, icon}
}
</script>

<section class="PersonalInfoCard">
  <Card>
    <div class="details">
      <div class="header">
        <div class="profile-image-wrapper">
          <ImageMask src={patient.profile_picture} alt="" absolute />
        </div>
  
        <h3 class="patient-name">{patient.name}</h3>
      </div>
  
      {#each userDetailList as userDetail (userDetail.label)}
        <UserDetailListItem {...fmtDetail(userDetail)} />
      {/each}

      <div class="action-wrapper">
        <Button label="Show All Information" padding="14px 40px"/>
      </div>
    </div>
  </Card>

</section>

<style lang="scss">
.PersonalInfoCard {
  width: 100%;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin: 0.75rem 0 0.5rem;
}

.profile-image-wrapper {
  position: relative;
  width: max(60%, 100px);
  aspect-ratio: 1;
}

.patient-name {
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.375;
}

.action-wrapper {
  margin-left: calc(45px + 1rem);
}
</style>