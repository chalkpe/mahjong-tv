import type { Mode } from './mode'
import type { Wind } from './wind'

export type Settings = {
  mode: Mode
  names: Record<Wind, string>
}
