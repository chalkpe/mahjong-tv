import { FC } from 'react'
import { useAtomValue } from 'jotai'
import { formatScore } from '../../../formator'
import settingsAtom from '../../../store/settings'
import { windsForMode } from '../../../util'
import BaseCell from '../BaseCell'
import type { BaseCellProps } from '../../../types/cell'

const ScoreCell: FC<BaseCellProps> = ({ round, isLast }) => {
  const { mode } = useAtomValue(settingsAtom)
  return (
    <>
      {windsForMode[mode].map((wind) => (
        <BaseCell key={wind} isLast={isLast}>
          {formatScore(round.scores[wind])}
        </BaseCell>
      ))}
    </>
  )
}

export default ScoreCell
