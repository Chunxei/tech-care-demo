<script lang="ts">
export let label: string
export let type: "button" | "submit" | "reset" | null | undefined = 'button'
export let padding = ""
</script>

<button {type} class="Button" style:--Button-padding={padding} on:click>
  <slot name="iconLeft" />
  {label}
</button>

<style lang="scss">
.Button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 25px;
  background: var(--color-primary);
  padding: var(--Button-padding, 0.6875rem 2.5rem);
  font-weight: bold;
  border: none;
  width: max-content;
  cursor: pointer;
}
</style>