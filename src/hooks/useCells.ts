
import { FC, useMemo } from 'react'

import HonbaCell from '~/table/cells/HonbaCell'
import HoujuuCell from '~/table/cells/HoujuuCell'
import ResultCell from '~/table/cells/ResultCell'
import ScoreCell from '~/table/cells/ScoreCell'
import SelectCell from '~/table/cells/SelectCell'
import TimeCell from '~/table/cells/TimeCell'

import { windsForMode } from '@/util'

import { useAtomValue } from 'jotai'
import settingsAtom from '@/store/settings'

import type { BaseCellProps } from '@/types/cell'

interface Cell {
  key: string
  names: string[]
  component: FC<BaseCellProps>
}

const useCells = (): Cell[] => {
  const { mode, names } = useAtomValue(settingsAtom)

  return useMemo(
    () => [
      { key: 'time', component: TimeCell, names: ['시간'] },
      { key: 'honba', component: HonbaCell, names: ['회차'] },
      { key: 'score', component: ScoreCell, names: windsForMode[mode].map((wind) => names[wind]) },
      { key: 'result', component: ResultCell, names: ['결과'] },
      { key: 'houjuu', component: HoujuuCell, names: ['방총'] },
      { key: 'select', component: SelectCell, names: ['수정'] },
    ],
    [mode, names]
  )
}

export default useCells
