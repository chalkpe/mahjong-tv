import type { Mode } from './mode'
import type { Tab } from './tab'
import type { Wind } from './wind'

export type Settings = {
  tab: Tab
  mode: Mode
  names: Record<Wind, string>
}
