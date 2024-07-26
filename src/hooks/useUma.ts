import { calculateUma } from '@/util'

import { useAtomValue } from 'jotai'
import { lastRoundAtom } from '@/store/rounds'
import settingsAtom from '@/store/settings'

const useUma = () => {
  const { mode } = useAtomValue(settingsAtom)
  const lastRound = useAtomValue(lastRoundAtom)
  return lastRound ? calculateUma(lastRound.scores, mode) : {}
}

export default useUma
