export function noop() {}

export function range(min: number, max: number, step: number): number[] {
  return [...Array(Math.floor((max - min) / step) + 1)].map((_, i) => min + i * step)
}