import { AgariType } from '@/types/agari'
import { Mode } from '@/types/mode'
import { Wind } from '@/types/wind'

export interface Round {
  time: number
  mode: Mode
  ba: Wind
  kyoku: number
  honba: number
  scores: Partial<Record<Wind, number>>
  type: AgariType
  agari: Wind[]
  houjuu?: Wind
}
