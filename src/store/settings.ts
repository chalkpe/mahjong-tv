import { atomWithStorage } from 'jotai/utils'
import { seatNames } from '../util'
import type { Settings } from '../types/settings'

const settingsAtom = atomWithStorage<Settings>('settings', {
  mode: 4,
  names: seatNames,
})

export default settingsAtom
