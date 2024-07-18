export type Wind = 'east' | 'south' | 'west' | 'north'

export const windOptions: { label: string; value: Wind }[] = [
  { label: '동', value: 'east' },
  { label: '남', value: 'south' },
  { label: '서', value: 'west' },
  { label: '북', value: 'north' },
]
