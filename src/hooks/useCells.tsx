import { FC, useMemo } from 'react'

import TimeCell from '../components/table/cells/TimeCell'
import HonbaCell from '../components/table/cells/HonbaCell'
import ScoreCell from '../components/table/cells/ScoreCell'
import ResultCell from '../components/table/cells/ResultCell'
import HoujuuCell from '../components/table/cells/HoujuuCell'
import SelectCell from '../components/table/cells/SelectCell'

import { useAtomValue } from 'jotai'
import settingsAtom from '../store/settings'

import { windsForMode } from '../util'
import type { BaseCellProps } from '../types/cell'

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
      { key: 'select', component: SelectCell, names: ['편집'] },
    ],
    [mode, names]
  )
}

export default useCells
