import type { Mode } from '@/types/mode'
import type { Tab } from '@/types/tab'
import type { Wind } from '@/types/wind'

export type Settings = {
  tab: Tab
  mode: Mode
  names: Record<Wind, string>
}
