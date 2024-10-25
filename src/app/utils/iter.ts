export const range = (min: number, max: number): number[] => {
  if (min >= max) return []
  return [...Array(max - min).keys()].map(i => min + i)
}

export const rangeCount = (min: number, max: number, cnt: number): number[] => {
  const step = (max - min) / (cnt - 1)
  return [...Array(cnt).keys()].map(i => min + step * i)
}
