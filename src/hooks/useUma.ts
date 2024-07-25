import { scoresForMode, umaForMode, umaWindPriority } from '@/util'

import { useAtomValue } from 'jotai'
import { lastRoundAtom } from '@/store/rounds'
import settingsAtom from '@/store/settings'

import type { Wind } from '@/types/wind'


const useUma = () => {
  const { mode } = useAtomValue(settingsAtom)
  const lastRound = useAtomValue(lastRoundAtom)
  const baseScores = (wind: Wind) => scoresForMode[mode][wind] ?? 0

  if (!lastRound) return {}
  return Object.fromEntries(
    Object.entries(lastRound.scores)
      .map(([wind, score]) => [wind, (score - baseScores(wind as Wind)) / 1000] as [Wind, number])
      .sort((a, b) => b[1] - a[1] || umaWindPriority.indexOf(a[0]) - umaWindPriority.indexOf(b[0]))
      .map(([wind, score], index) => [wind, { score: score + umaForMode[mode][index], index }] as const)
  )
}

export default useUma
