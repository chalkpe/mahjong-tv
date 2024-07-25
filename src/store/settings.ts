import { seatNames } from '@/util'

import { atomWithStorage } from 'jotai/utils'

import type { Settings } from '@/types/settings'

const settingsAtom = atomWithStorage<Settings>('settings', {
  tab: 'settings',
  mode: 4,
  names: seatNames,
})

export default settingsAtom
