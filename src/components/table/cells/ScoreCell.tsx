import { FC } from 'react'
import BaseCell from '../BaseCell'

import { useAtomValue } from 'jotai'
import settingsAtom from '../../../store/settings'
import { windsForMode } from '../../../util'
import type { BaseCellProps } from '../../../types/cell'

const ScoreCell: FC<BaseCellProps> = ({ round, isLast }) => {
  const { mode } = useAtomValue(settingsAtom)
  return (
    <>
      {windsForMode[mode].map((wind) => (
        <BaseCell key={wind} isLast={isLast}>{round.scores[wind]}</BaseCell>
      ))}
    </>
  )
}

export default ScoreCell
