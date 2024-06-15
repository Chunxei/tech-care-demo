<script lang="ts">
	import ImageMask from "./ImageMask.svelte";

  export let label: string
  export let value: string
  export let icon: string
</script>

<div class="UserDetailListItem">
  <div class="profile-image-wrapper">
    <ImageMask src={icon} alt="" absolute />
  </div>

  <div class="user-info">
    <h5 class="label">{label}</h5>
    <p class="label-value">{value}</p>
  </div>
</div>

<style lang="scss">
.UserDetailListItem {
  display: flex;
  align-items: center;
  height: 45px;
  width: 100%;
  gap: 1rem;
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
  gap: 0.5rem;
  padding: 0.3rem 0;
  text-align: start;
}

.label-value {
  font-weight: bold;
}
</style>