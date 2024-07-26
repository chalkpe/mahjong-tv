import type { Mode } from '@/types/mode'
import type { Wind } from '@/types/wind'

export interface History {
  time: number
  mode: Mode
  scores: Partial<Record<Wind, number>>
}
