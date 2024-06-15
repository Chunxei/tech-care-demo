<script lang="ts">
	import type { Patient } from "$lib/types";
	import ImageMask from "./ImageMask.svelte";
  import menuIcon from "$assets/icons/menu-icon_x-axis.svg";
	import { noop } from "$lib/utils";

  export let patient: Patient
  export let active: boolean = false
</script>

<button type="button" class="PatientListCard" class:active on:click>
  <div class="profile-image-wrapper">
    <ImageMask src={patient.profile_picture} alt="" absolute />
  </div>

  <div class="user-info">
    <h5 class="user-name">{patient.name}</h5>
    <p class="user-biodata">{patient.gender}, {patient.age}</p>
  </div>

  <button class="menu-btn" on:click|stopPropagation={noop}>
    <img src={menuIcon} alt="">
  </button>
</button>

<style lang="scss">
.PatientListCard {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  gap: 0.75rem;
  padding: 1rem var(--card-p);
  background: var(--color-white);
  border: none;
  cursor: pointer;
  
  &.active {
    background: var(--color-active-state-2);
  }
}

.profile-image-wrapper {
  position: relative;
  height: 100%;
  aspect-ratio: 1;
}

.user-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.3rem 0;
  text-align: start;
}

.user-name {
  font-weight: bold;
}

.user-biodata {
  color: var(--color-text-gray);
}

.menu-btn {
  border: none;
  background: none;
  padding: 0.625rem 0.625rem;
  margin-left: auto;
  cursor: pointer;
}
</style>