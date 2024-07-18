import { AgariType } from './agari'
import { Mode } from './mode'
import { Wind } from './wind'

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
