<script lang="ts">
export let src: string
export let alt = ""

export let absolute: boolean = false

</script>

<div class="ImageMask {$$props.class}" class:absolute>
  <img {src} {alt}>
</div>

<style lang="scss">
.ImageMask {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 999px;
  overflow: hidden;

  &.absolute {
    position: absolute;
    inset: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>